import { Post } from "../../redux/posts"

export type patchPostArgs = {
  signal: AbortSignal
  id: number
  post: Post
}
