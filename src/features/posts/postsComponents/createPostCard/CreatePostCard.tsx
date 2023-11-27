import "./CreatePostCard.css"
import { FC, MouseEventHandler } from "react"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { Post, selectPosts } from "../../postsSlice"
import { shortenText } from "../../../../utils/shortenText"
import {
  setClickedPostId,
  setEditedPost,
  setIsOpen,
  setOriginalPost,
} from "../../../singlePostWindow/singlePostWindowSlice"

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
    console.log("-- post", post)
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
