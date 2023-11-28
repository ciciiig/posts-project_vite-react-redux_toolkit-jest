import { Post, PostsState } from "../redux/posts"

export const filterPosts = (
  posts: Post[],
  searchValue: PostsState["searchValue"],
) =>
  posts.filter(
    (post) =>
      post.title.includes(searchValue) || post.body.includes(searchValue),
  )
