import "./PostsList.css"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { fetchPosts, selectPosts } from "../../postsSlice"
import {
  setClickedPostId,
  setEditedPost,
  setIsOpen,
  setOriginalPost,
} from "../../../singlePostWindow/singlePostWindowSlice"
import { getCurrentPostsState } from "../../../../utils/getCurrentPostsState"
import {
  selectPagination,
  setMaxPages,
} from "../../../pagination/paginationSlice"
import { useEffect } from "react"
import { setCurrentPosts } from "../../postsSlice"
import { CreatePostCard } from "../createPostCard/CreatePostCard"
import { Alert } from "../alert/Alert"

export const PostsList = () => {
  const posts = useAppSelector(selectPosts)
  const pagination = useAppSelector(selectPagination)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  useEffect(() => {
    const currentPosts = getCurrentPostsState(
      posts.allPosts,
      pagination.currentPage,
      posts.searchValue,
    )
    dispatch(setMaxPages(currentPosts.maxPages))
    dispatch(setCurrentPosts(currentPosts.currentPosts))
  }, [dispatch, posts.allPosts, pagination.currentPage, posts.searchValue])

  return (
    <div className="posts_container" id="posts_container">
      {posts.currentPosts?.map((post) => (
        <CreatePostCard post={post} />
      ))}
      <Alert />
    </div>
  )
}
