import "./Alert.css"
import { FC } from "react"
import { useAppSelector } from "../../../../app/hooks"
import { selectPosts } from "../../postsSlice"

export const Alert: FC = () => {
  const postState = useAppSelector(selectPosts)
  let alertContent = null

  if (postState.status === "loading") {
    alertContent = (
      <div className="alert-message_updating">Post Updating...</div>
    )
  }

  if (postState.status === "failed") {
    alertContent = (
      <div className="alert-message_error">
        {postState.error ?? "Some error"}
      </div>
    )
  }

  return (
    <div className="alert-container" id="alert-container">
      {alertContent}
    </div>
  )
}
