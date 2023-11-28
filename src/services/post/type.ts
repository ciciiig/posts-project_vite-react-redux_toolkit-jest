import { Post } from "../../redux/posts"

export type PatchPostArgs = {
  signal: AbortSignal
  id: number
  post: Post
}
