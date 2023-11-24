import { Posts, PostsState } from "../features/posts/postsSlice"

export const filterPosts = (
  posts: Posts[],
  searchValue: PostsState["searchValue"],
) =>
  posts.filter(
    (post) =>
      post.title.includes(searchValue) || post.body.includes(searchValue),
  )
