import "./Pagination.css"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  selectPagination,
  setNextPage,
  setPreviousPage,
} from "./paginationSlice"

export const Pagination = () => {
  const pagination = useAppSelector(selectPagination)
  const dispatch = useAppDispatch()

  return (
    <div className="pagination-container">
      <button
        className="arrow"
        disabled={pagination.postNavigation.isPrevBtnDisabled}
        onClick={() => dispatch(setPreviousPage())}
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
