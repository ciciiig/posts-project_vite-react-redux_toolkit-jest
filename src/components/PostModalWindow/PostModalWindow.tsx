import "./PostModalWindow.css"
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import {
  patchPost,
  selectPosts,
  updatePostBody,
  setPatchRequest,
} from "../../redux/posts"
import { selectPostModal, setIsOpen } from "../../redux/postModal"
import { ChangeEventHandler, MouseEventHandler, useRef, useState } from "react"

export const PostModalWindow = () => {
  const posts = useAppSelector(selectPosts)
  const singlePostWindow = useAppSelector(selectPostModal)
  const dispatch = useAppDispatch()
  const textareaEditedValue = useRef<HTMLTextAreaElement>(null)
  const post = singlePostWindow.originalPost
  const [textAreaValue, setTextAreaValue] = useState("")

  const handleTextAreaOnChange: ChangeEventHandler<HTMLTextAreaElement> = (
    changeEvent,
  ) => {
    const { value } = changeEvent.currentTarget
    setTextAreaValue(value)
  }

  const handleCloseModalWindow: MouseEventHandler<
    HTMLDivElement | HTMLButtonElement
  > = (clickEvent) => {
    const { id } = clickEvent.target as HTMLDivElement | HTMLButtonElement
    if (id === "modal-back" || id === "modal-window-header__close-button") {
      dispatch(setIsOpen(false))
    }
  }

  const handleConfirm = () => {
    if (!singlePostWindow.clickedPostId) {
      return
    }

    dispatch(
      updatePostBody({
        id: singlePostWindow.clickedPostId,
        body: textAreaValue,
      }),
    )
    // ToDo fix type
    posts.patchRequests[post!.id]?.abort()
    const promise = dispatch(patchPost(singlePostWindow))
    dispatch(
      setPatchRequest({
        id: post!.id,
        fetchObject: promise,
      }),
    )
    dispatch(setIsOpen(false))
  }

  return (
    <div
      className="modal-back"
      id="modal-back"
      onClick={handleCloseModalWindow}
    >
      <div className="modal-window" id="modal-window">
        <div className="modal-window-header" id="modal-window-header">
          <button
            id="modal-window-header__close-button"
            onClick={handleCloseModalWindow}
          >
            X
          </button>
        </div>
        <div className="modal-window-edited-post" id="modal-window-edited-post">
          <h3>{`${post.id}. ${capitalizeFirstLetter(post.title)}`}</h3>
          <textarea
            ref={textareaEditedValue}
            id="modal-window-edited-post__edited-text"
            style={{ resize: "none" }}
            cols={58}
            rows={10}
            defaultValue={textAreaValue || post?.body}
            onChange={handleTextAreaOnChange}
          />
        </div>
        <div
          className="modal-window-acton-buttons-container"
          id="modal-window-acton-buttons-container"
        >
          <button
            id="modal-window-acton-buttons-container__confirm-button"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}
