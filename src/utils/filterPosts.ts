import { Posts } from "../features/posts/postsSlice"

export const filterPosts = (posts: Posts[], searchValue: string) =>
  posts.filter(
    (post) =>
      post.title.includes(searchValue) || post.body.includes(searchValue),
  )
