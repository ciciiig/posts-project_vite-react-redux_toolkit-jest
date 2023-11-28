import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import config from "../../../config.json"
import { PostModalState } from "../postModal"
import { Post, PostsState, UpdatedPostBody } from "./type"
import { fetchPosts, patchPost, updatePostBody } from "./actions"

const initialState: PostsState = {
  allPosts: [],
  skeletonStatus: "idle",
  status: "idle",
  error: undefined,
  currentPosts: [],
  maxPostsPerPage: config.maxPostsPerPage,
  searchValue: "",
  patchRequests: {},
}

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setCurrentPosts(state, action: PayloadAction<Post[]>) {
      state.currentPosts = action.payload
    },
    setSearchValue(state, action: PayloadAction<PostsState["searchValue"]>) {
      state.searchValue = action.payload
    },
    updatePostBody(state, action: PayloadAction<UpdatedPostBody>) {
      const { id, body } = action.payload
      const existingPost = state.allPosts.find((post) => post.id === id)

      if (existingPost) {
        existingPost.body = body
      }
    },
    setPatchRequest(
      state,
      action: PayloadAction<{
        id: number
        fetchObject: Promise<PayloadAction<any>>
      }>,
    ) {
      const { id, fetchObject } = action.payload

      state.patchRequests[id] = fetchObject
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.skeletonStatus = "loading"
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.skeletonStatus = "idle"
        state.allPosts = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.skeletonStatus = "failed"
        state.error = `${action.error.name}: ${action.error.message}`
      })
      .addCase(patchPost.pending, (state) => {
        state.status = "loading"
      })
      .addCase(
        patchPost.fulfilled,
        (state, action: PayloadAction<PostModalState>) => {
          state.status = "idle"
          const editedPost = action.payload.editedPost
          if (editedPost && editedPost.body !== undefined) {
            postsSlice.actions.updatePostBody({
              id: editedPost.id,
              body: editedPost.body,
            })
          }
        },
      )
      .addCase(patchPost.rejected, (state, action) => {
        state.status = "failed"
        state.error = `${action.error.name}: ${action.error.message}`
        const { id, body } = action.meta.arg.editedPost
        const existingPost = state.allPosts.find((post) => post.id === id)

        if (existingPost) {
          existingPost.body = body
        }
        // TODO: dissapear Alert after 5 seconds
        // setTimeout(() => {
        //   state.status = "idle"
        //   console.log(state.status)
        // }, 2000)
      })
  },
})
