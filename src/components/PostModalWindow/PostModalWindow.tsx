import "./PostModalWindow.css"
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import {
  patchPost,
  selectPosts,
  updatePost,
  setPatchRequest,
  Post,
} from "../../redux/posts"
import {
  selectPostModal,
  setEditedPost,
  setIsOpen,
} from "../../redux/postModal"
import { ChangeEventHandler, MouseEventHandler, useState } from "react"

export const PostModalWindow = () => {
  const posts = useAppSelector(selectPosts)
  const { originalPost } = useAppSelector(selectPostModal)
  const dispatch = useAppDispatch()
  const [textAreaValue, setTextAreaValue] = useState("")

  if (!originalPost) return null

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
    const editedPost: Post = {
      ...originalPost,
      body: textAreaValue,
    }

    dispatch(setIsOpen(false))
    dispatch(setEditedPost(editedPost))
    // optimistic update post
    dispatch(updatePost(editedPost))

    // ToDo fix type
    // posts.patchRequests[originalPost.id]?.abort()
    const promise = dispatch(patchPost(editedPost))
    dispatch(
      setPatchRequest({
        id: originalPost!.id,
        fetchObject: promise,
      }),
    )
  }

  return (
    <div
      className="modal-back"
      id="modal-back"
      onMouseDown={handleCloseModalWindow}
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
          <h3>{`${originalPost.id}. ${capitalizeFirstLetter(
            originalPost.title,
          )}`}</h3>
          <textarea
            id="modal-window-edited-post__edited-text"
            style={{ resize: "none" }}
            cols={58}
            rows={10}
            defaultValue={textAreaValue || originalPost?.body}
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
