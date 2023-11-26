import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import config from "../../../config.json"

export interface PostsState {
  allPosts: Post[]
  status: "idle" | "loading" | "failed"
  error: string | null
  currentPosts: Post[]
  maxPostsPerPage: number
  searchValue: string
}

export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export interface UpdatedPostBody {
  id: number
  body: string
}

const initialState: PostsState = {
  allPosts: [],
  status: "idle",
  error: null,
  currentPosts: [],
  maxPostsPerPage: config.maxPostsPerPage,
  searchValue: "",
}

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts")
  return await response.json()
})

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
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "idle"
        state.allPosts = action.payload
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export const { setCurrentPosts, setSearchValue, updatePostBody } =
  postsSlice.actions

export const selectPosts = (state: RootState) => state.posts

export default postsSlice.reducer
