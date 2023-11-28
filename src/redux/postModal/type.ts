import { Post } from "../posts"

export type PostModalState = {
  isOpen: boolean
  clickedPostId: number | null
  originalPost: Post | undefined
  editedPost: Post | undefined
}
