import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import config from "../../../config.json"
import { Post, PostsState } from "./type"
import { fetchPosts, patchPost, updatePost } from "./"

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
    updatePost(state, action: PayloadAction<Post>) {
      const editedPost = action.payload
      const existingPostId = state.allPosts.findIndex(
        (post) => post.id === editedPost.id,
      )

      state.allPosts[existingPostId] = editedPost
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
      .addCase(patchPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.status = "idle"

        const editedPost = action.payload
        updatePost(editedPost)
      })
      .addCase(patchPost.rejected, (state, action) => {
        state.status = "failed"
        state.error = `${action.error.name}: ${action.error.message}`
      })
  },
})
