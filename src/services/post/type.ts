import { Post } from "../../redux/posts"

export type PatchPostArgs = {
  signal: AbortSignal
  post: Post
}
