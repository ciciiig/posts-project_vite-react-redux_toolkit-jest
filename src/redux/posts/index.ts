import { postsSlice } from "./slice"
import { PostsState, Post } from "./type"
import { selectPosts } from "./selectors"
import {
  setCurrentPosts,
  setSearchValue,
  updatePost,
  setPatchRequest,
  fetchPosts,
  patchPost,
} from "./actions"

// export reducer
export const postsReducer = postsSlice.reducer
// export types
export type { PostsState, Post }
// export selectors
export { selectPosts }
// export actions
export {
  setCurrentPosts,
  setSearchValue,
  updatePost,
  setPatchRequest,
  fetchPosts,
  patchPost,
}
