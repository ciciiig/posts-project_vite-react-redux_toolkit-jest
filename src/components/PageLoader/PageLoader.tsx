import "./PageLoader.css"
import { FC } from "react"
import { useAppSelector } from "../../redux/hooks"
import { selectPosts } from "../../redux/posts"

export const PageLoader: FC = () => {
  const postState = useAppSelector(selectPosts)
  let skeletonAlertContent = null

  if (postState.skeletonStatus === "loading") {
    skeletonAlertContent = (
      <div className="alertSkeleton-container">Loading...</div>
    )
  }

  if (postState.skeletonStatus === "failed") {
    skeletonAlertContent = (
      <div className="alertSkeleton-container">
        <div>{postState.error ?? "Some error"}</div>
      </div>
    )
  }

  if (postState.skeletonStatus === "idle") {
    skeletonAlertContent = null
  }

  return skeletonAlertContent
}
