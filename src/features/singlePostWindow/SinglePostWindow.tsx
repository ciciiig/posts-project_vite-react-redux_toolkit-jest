import "./SinglePostWindow.css"
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectPosts } from "../posts/postsSlice"
import { selectSinglePostWindow, setIsOpen } from "./singlePostWindowSlice"
import { useEffect, useRef } from "react"

export const SinglePostWindow = () => {
  const posts = useAppSelector(selectPosts)
  const singlePostWindow = useAppSelector(selectSinglePostWindow)
  const dispatch = useAppDispatch()
  const modalWindowRef = useRef<HTMLDivElement>(null)

  const post = posts.find(
    (currentPost) => currentPost.id === singlePostWindow.clickedPostId,
  )

  useEffect(() => {
    const handleClickSinglePostWindow = (event: MouseEvent) => {
      if (
        (event.target as HTMLElement).id === "modal-back" ||
        (event.target as HTMLElement).id === "modal-window-header__close-button"
      ) {
        dispatch(setIsOpen(false))
      }
      if (
        (event.target as HTMLElement).id ===
        "modal-window-acton-buttons-container__confirm-button"
      ) {
        // onConfirm()
      }
    }

    document.addEventListener("mouseup", handleClickSinglePostWindow)

    return () => {
      document.removeEventListener("mouseup", handleClickSinglePostWindow)
    }
  }, [dispatch])

  if (post && singlePostWindow.isOpen) {
    return (
      <div className="modal-back" id="modal-back">
        <div className="modal-window" id="modal-window" ref={modalWindowRef}>
          <div className="modal-window-header" id="modal-window-header">
            <button id="modal-window-header__close-button">X</button>
          </div>
          <div
            className="modal-window-edited-post"
            id="modal-window-edited-post"
          >
            <h3>{`${post.id}. ${capitalizeFirstLetter(post.title)}`}</h3>
            <textarea
              id="modal-window-edited-post__edited-text"
              style={{ resize: "none" }}
              cols={58}
              rows={10}
              defaultValue={post.body}
            />
          </div>
          <div
            className="modal-window-acton-buttons-container"
            id="modal-window-acton-buttons-container"
          >
            <button id="modal-window-acton-buttons-container__confirm-button">
              Confirm
            </button>
          </div>
        </div>
      </div>
    )
  }
}
