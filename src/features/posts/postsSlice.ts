import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import config from "../../../config.json"
import { allPosts } from "../../app/services/allPosts"

export interface PostsState {
  allPosts: Post[]
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
  allPosts: allPosts,
  currentPosts: [],
  maxPostsPerPage: config.maxPostsPerPage,
  searchValue: "",
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
  },
})

export const { setCurrentPosts, setSearchValue, updatePostBody } =
  postsSlice.actions

export const selectPosts = (state: RootState) => state.posts

export default postsSlice.reducer
