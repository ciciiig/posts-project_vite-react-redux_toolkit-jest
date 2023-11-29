import { Post } from "../../redux/posts"

export type patchPostArgs = {
  signal: AbortSignal
  post: Post
}
