import { postsSlice } from "./slice"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { postService } from "../../services/post"
import { Post } from "./type"
import { RootState } from "../store"

export const { setCurrentPosts, setSearchValue, updatePost, setPatchRequest } =
  postsSlice.actions
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () =>
  postService.getPost(),
)

export const patchPost = createAsyncThunk(
  "posts/patchPost",
  async (postToUpdate: Post, thunkAPI) => {
    const state = thunkAPI.getState() as RootState
    const { originalPost } = state.postModal

    try {
      return await postService.patchPost({
        post: postToUpdate,
        signal: thunkAPI.signal,
      })
    } catch (error) {
      if (originalPost) {
        thunkAPI.dispatch(updatePost(originalPost))
      }

      throw error
    }
  },
)
