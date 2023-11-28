import "./PostsList.css"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { fetchPosts, selectPosts, setCurrentPosts } from "../../redux/posts"
import { selectPagination, setMaxPages } from "../../redux/pagination"
import { getCurrentPostsState } from "../../utils/getCurrentPostsState"
import { useEffect } from "react"
import { CreatePostCard } from "../CreatePostCard/CreatePostCard"

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
        <CreatePostCard key={crypto.randomUUID()} post={post} />
      ))}
    </div>
  )
}
