import "./Alert.css"
import { FC } from "react"
import { useAppSelector } from "../../redux/hooks"
import { selectPosts } from "../../redux/posts"

export const Alert: FC = () => {
  const postState = useAppSelector(selectPosts)
  let alertContent = null

  if (postState.status === "loading") {
    alertContent = <div className="alert-message_updating">Loading...</div>
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
