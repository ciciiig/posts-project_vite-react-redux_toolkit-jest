import { postsSlice } from "./slice"
import { PostsState, Post, UpdatedPostBody } from "./type"
import { selectPosts } from "./selectors"
import {
  setCurrentPosts,
  setSearchValue,
  updatePostBody,
  setPatchRequest,
  fetchPosts,
  patchPost,
} from "./actions"

// export reducer
export const postsReducer = postsSlice.reducer
// export types
export type { PostsState, Post, UpdatedPostBody }
// export selectors
export { selectPosts }
// export actions
export {
  setCurrentPosts,
  setSearchValue,
  updatePostBody,
  setPatchRequest,
  fetchPosts,
  patchPost,
}
