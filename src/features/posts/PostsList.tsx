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

export const PostsList = () => {
  const posts = useAppSelector(selectPosts)

  const dispatch = useAppDispatch()

  const renderedPosts = posts.map((post) => (
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
      const clickedPost = posts.find(
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
