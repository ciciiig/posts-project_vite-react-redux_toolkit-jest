import "./PostsList.css"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { selectPosts } from "../../postsSlice"
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

export const PostsList = () => {
  const posts = useAppSelector(selectPosts)
  const pagination = useAppSelector(selectPagination)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const currentPosts = getCurrentPostsState(
      posts.allPosts,
      pagination.currentPage,
      posts.searchValue,
    )
    dispatch(setMaxPages(currentPosts.maxPages))
    dispatch(setCurrentPosts(currentPosts.currentPosts))
  }, [dispatch, posts.allPosts, pagination.currentPage, posts.searchValue])

  const handleClickPosts = (clickEvent: React.MouseEvent<HTMLDivElement>) => {
    const target = clickEvent.target as HTMLElement
    const closestPostCard = target.closest(".post")

    if (closestPostCard) {
      const postId = closestPostCard.id.split("-")[2]
      const clickedPost = posts.allPosts.find(
        (currentPost) => currentPost.id === +postId,
      )

      if (clickedPost) {
        dispatch(setClickedPostId(+postId))
        dispatch(setIsOpen(true))
        dispatch(setOriginalPost(clickedPost))
        dispatch(setEditedPost(clickedPost))
      }
    }
  }

  return (
    <div
      className="posts_container"
      id="posts_container"
      onClick={handleClickPosts}
    >
      <CreatePostCard />
    </div>
  )
}
