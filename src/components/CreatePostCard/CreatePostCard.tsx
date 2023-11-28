import "./CreatePostCard.css"
import { FC, MouseEventHandler } from "react"
import { useAppDispatch } from "../../redux/hooks"
import { Post } from "../../redux/posts"
import { shortenText } from "../../utils/shortenText"
import {
  setClickedPostId,
  setEditedPost,
  setIsOpen,
  setOriginalPost,
} from "../../redux/postModal"

export type CreatePostCardProps = {
  post: Post
}

export const CreatePostCard: FC<CreatePostCardProps> = ({ post }) => {
  const dispatch = useAppDispatch()

  const handleClickPost: MouseEventHandler<HTMLDivElement> = (event) => {
    const { id: postId } = event.currentTarget
    const id = +postId.split("post-card-")[1]
    dispatch(setClickedPostId(id))
    dispatch(setIsOpen(true))
    if (!post) return
    dispatch(setOriginalPost(post))
    dispatch(setEditedPost(post))
  }

  return (
    <div
      className="post"
      id={`post-card-${post.id}`}
      key={crypto.randomUUID()}
      onClick={handleClickPost}
    >
      <div>{post.id}</div>
      <div>{shortenText(post.title)}</div>
      <div className="post-body">{post.body}</div>
    </div>
  )
}
