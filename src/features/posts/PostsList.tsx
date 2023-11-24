import "./PostsList.css"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectPosts } from "./postsSlice"
import { shortenText } from "../../utils/shortenText"
import {
  setClickedPostId,
  setEditedPost,
  setIsOpen,
  setOriginalPost,
} from "../singlePostWindow/singlePostWindowSlice"
import { getCurrentPostsState } from "../../utils/getCurrentPostsState"
import { selectPagination, setMaxPages } from "../pagination/paginationSlice"
import { useEffect } from "react"
import { setCurrentPosts } from "./postsSlice"

export const PostsList = () => {
  const posts = useAppSelector(selectPosts)
  const pagination = useAppSelector(selectPagination)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      setMaxPages(
        getCurrentPostsState(
          posts.allPosts,
          pagination.currentPage,
          posts.searchValue,
        ).maxPages,
      ),
    )
    dispatch(
      setCurrentPosts(
        getCurrentPostsState(
          posts.allPosts,
          pagination.currentPage,
          posts.searchValue,
        ).currentPosts,
      ),
    )
  }, [dispatch, posts.allPosts, pagination.currentPage, posts.searchValue])

  const renderedPosts = posts.currentPosts?.map((post) => (
    <div className="post" id={`post-card-${post.id}`} key={crypto.randomUUID()}>
      <div>{post.id}</div>
      <div>{shortenText(post.title)}</div>
      <div className="post-body">{post.body}</div>
    </div>
  ))

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
      {renderedPosts}
    </div>
  )
}
