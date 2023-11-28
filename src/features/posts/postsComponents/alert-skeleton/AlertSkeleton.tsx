import "./AlertSkeleton.css"
import { FC } from "react"
import { useAppSelector } from "../../../../app/hooks"
import { selectPosts } from "../../postsSlice"

export const AlertSkeleton: FC = () => {
  const postState = useAppSelector(selectPosts)
  let skeletonAlertContent = null

  if (postState.skeletonStatus === "loading") {
    skeletonAlertContent = (
      <div className="alertSkeleton-container">Loading...</div>
    )
  }

  if (postState.skeletonStatus === "failed") {
    skeletonAlertContent = <div>{postState.error ?? "Some error"}</div>
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
