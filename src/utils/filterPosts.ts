import { Post, PostsState } from "../features/posts/postsSlice"

export const filterPosts = (
  posts: Post[],
  searchValue: PostsState["searchValue"],
) =>
  posts.filter(
    (post) =>
      post.title.includes(searchValue) || post.body.includes(searchValue),
  )
