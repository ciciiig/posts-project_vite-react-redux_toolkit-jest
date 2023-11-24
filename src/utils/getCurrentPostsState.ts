import { filterPosts } from "./filterPosts.js"
import config from "../../config.json"
import { Posts, PostsState } from "../features/posts/postsSlice.js"
import { PaginationState } from "../features/pagination/paginationSlice.js"

export const getCurrentPostsState = (
  allPosts: Posts[],
  currentPage: PaginationState["currentPage"],
  searchValue: PostsState["searchValue"],
) => {
  const posts = searchValue ? filterPosts(allPosts, searchValue) : allPosts

  const maxPages = Math.ceil(posts.length / config.maxPostsPerPage) // for test: 100 / 12 = 8.333 -> 9
  const endIndex = currentPage * config.maxPostsPerPage // for test: 3 * 12 = 36
  const startIndex = endIndex - config.maxPostsPerPage // for test: 35 - 12= 24
  const currentPosts = posts.slice(startIndex, endIndex)

  return { maxPages, currentPosts }
}
