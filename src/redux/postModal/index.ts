import { postModalSlice } from "./slice"
import { selectPostModal } from "./selectors"
import {
  setClickedPostId,
  setIsOpen,
  setOriginalPost,
  setEditedPost,
} from "./actions"
import { PostModalState } from "./type"

// export reducer
export const postModalReducer = postModalSlice.reducer
// export selectors
export { selectPostModal }
// export actions
export { setClickedPostId, setIsOpen, setOriginalPost, setEditedPost }
// export types
export type { PostModalState }
