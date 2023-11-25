import "./CreatePostCard.css"
import { FC } from "react"
import { useAppSelector } from "../../../../app/hooks"
import { selectPosts } from "../../postsSlice"
import { shortenText } from "../../../../utils/shortenText"

export const CreatePostCard: FC = () => {
  const posts = useAppSelector(selectPosts)

  let renderPosts

  if (posts.currentPosts && posts.currentPosts.length > 0) {
    renderPosts = posts.currentPosts.map((post) => (
      <div
        className="post"
        id={`post-card-${post.id}`}
        key={crypto.randomUUID()}
      >
        <div>{post.id}</div>
        <div>{shortenText(post.title)}</div>
        <div className="post-body">{post.body}</div>
      </div>
    ))
  } else {
    renderPosts = (
      <h1>"We couldn't find any posts matching your search criteria."</h1>
    )
  }

  return renderPosts
}
