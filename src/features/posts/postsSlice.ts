import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import config from "../../../config.json"
import { allPosts } from "../../app/services/allPosts"

export interface PostsState {
  allPosts: Posts[]
  currentPosts?: Posts[]
  maxPostsPerPage: number
  searchValue: string
}

export interface Posts {
  userId: number
  id: number
  title: string
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
    setCurrentPosts(state, action: PayloadAction<Posts[]>) {
      state.currentPosts = action.payload
    },
  },
})

export const { setCurrentPosts } = postsSlice.actions

export const selectPosts = (state: RootState) => state.posts

export default postsSlice.reducer
