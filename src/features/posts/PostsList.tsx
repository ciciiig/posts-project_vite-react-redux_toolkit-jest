import "./PostsList.css"
import { useAppSelector } from "../../app/hooks"
import { selectPosts } from "./postsSlice"
import { shortenText } from "../../utils/shortenText"

export const PostsList = () => {
  const posts = useAppSelector(selectPosts)

  const renderedPosts = posts.map((post) => (
    <div className="post" id={`post-card-${post.id}`} key={crypto.randomUUID()}>
      <div>{post.id}</div>
      <div>{shortenText(post.title)}</div>
      <div className="post-body">{post.body}</div>
    </div>
  ))

  return (
    <div className="posts_container" id="posts_container">
      {renderedPosts}
    </div>
  )
}
