import "./Alert.css"
import { FC, ReactNode, useEffect, useState } from "react"
import { useAppSelector } from "../../redux/hooks"
import { selectPosts } from "../../redux/posts"

export const Alert: FC = () => {
  const { status, error } = useAppSelector(selectPosts)
  const [alertState, setAlertState] = useState<{
    isShow: boolean
    alertContent: ReactNode
  }>({
    isShow: false,
    alertContent: null,
  })

  // For close Alert
  useEffect(() => {
    let timerId: number

    if (alertState.isShow) {
      timerId = setTimeout(() => {
        setAlertState({ isShow: false, alertContent: null })
        clearTimeout(timerId)
      }, 3000)
    }

    return () => {
      timerId && clearTimeout(timerId)
    }
  }, [alertState.isShow])

  // For set open Alert with correct content
  useEffect(() => {
    if (status === "loading") {
      setAlertState({
        isShow: true,
        alertContent: <div className="alert-message_updating">Loading...</div>,
      })
    }

    if (status === "failed") {
      setAlertState({
        isShow: true,
        alertContent: (
          <div className="alert-message_error">{error ?? "Some error"}</div>
        ),
      })
    }
  }, [status])

  return alertState.isShow ? (
    <div className="alert-container" id="alert-container">
      {alertState.alertContent}
    </div>
  ) : null
}
