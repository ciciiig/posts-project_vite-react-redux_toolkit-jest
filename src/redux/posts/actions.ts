import { postsSlice } from "./slice"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { postService } from "../../services/post"
import { PostModalState } from "../postModal"

export const {
  setCurrentPosts,
  setSearchValue,
  updatePostBody,
  setPatchRequest,
} = postsSlice.actions

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () =>
  postService.getPost(),
)

export const patchPost = createAsyncThunk(
  "posts/patchPost",
  async (postToUpdate: PostModalState, thunkAPI) => {
    if (postToUpdate.clickedPostId && postToUpdate.editedPost) {
      await postService.patchPost({
        id: postToUpdate.clickedPostId,
        post: postToUpdate.editedPost,
        signal: thunkAPI.signal,
      })
    }
  },
)
