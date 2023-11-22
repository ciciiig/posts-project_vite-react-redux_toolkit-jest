import "./Pagination.css"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  selectPagination,
  setNextPage,
  setPreviousPage,
} from "./paginationSlice"
import { useRef } from "react"

export const Pagination = () => {
  const pagination = useAppSelector(selectPagination)
  const dispatch = useAppDispatch()
  const prevBtnElement = useRef(null)

  return (
    <div className="pagination-container">
      <button
        className="arrow"
        ref={prevBtnElement}
        disabled={pagination.postNavigation.isPrevBtnDisabled}
        onClick={() => dispatch(setPreviousPage())}
        // onClick={() => console.log(prevBtnElement.current)}
      >
        {"<<<"}
      </button>
      <span className="page-number" id="page-number">
        {pagination.currentPage}
      </span>
      <button
        className="arrow"
        id="right-arrow"
        disabled={pagination.postNavigation.isNextBtnDisabled}
        onClick={() => dispatch(setNextPage())}
      >
        {">>>"}
      </button>
    </div>
  )
}
