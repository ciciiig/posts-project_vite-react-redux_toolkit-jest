import "./SinglePostWindow.css"
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectPosts, updatePostBody } from "../posts/postsSlice"
import { selectSinglePostWindow, setIsOpen } from "./singlePostWindowSlice"
import { useEffect, useRef } from "react"

export const SinglePostWindow = () => {
  const posts = useAppSelector(selectPosts)
  const singlePostWindow = useAppSelector(selectSinglePostWindow)
  const dispatch = useAppDispatch()
  const textareaEditedValue = useRef<HTMLTextAreaElement>(null)

  const post = posts.allPosts.find(
    (currentPost) => currentPost.id === singlePostWindow.clickedPostId,
  )

  useEffect(() => {
    function onConfirm() {
      if (textareaEditedValue.current && singlePostWindow.clickedPostId) {
        dispatch(
          updatePostBody({
            id: singlePostWindow.clickedPostId,
            body: textareaEditedValue.current.value,
          }),
        )
        dispatch(setIsOpen(false))
      }

      // appState.postUpdate.isFetching = true

      // await patchPost(appState)
      // if (appState.postUpdate.error) {
      //   updatePostBody(appState.modalWindow.originalPost.body)
      // }
    }
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
        onConfirm()
      }
    }
    document.addEventListener("mouseup", handleClickSinglePostWindow)

    return () => {
      document.removeEventListener("mouseup", handleClickSinglePostWindow)
    }
  }, [dispatch, singlePostWindow.clickedPostId])

  if (post && singlePostWindow.isOpen) {
    return (
      <div className="modal-back" id="modal-back">
        <div className="modal-window" id="modal-window">
          <div className="modal-window-header" id="modal-window-header">
            <button id="modal-window-header__close-button">X</button>
          </div>
          <div
            className="modal-window-edited-post"
            id="modal-window-edited-post"
          >
            <h3>{`${post.id}. ${capitalizeFirstLetter(post.title)}`}</h3>
            <textarea
              ref={textareaEditedValue}
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
