import { paginationSlice } from "./slice"
import { selectPagination } from "./selectors"
import {
  setCurrentPage,
  setPreviousPage,
  setNextPage,
  setMaxPages,
} from "./actions"
import { PaginationState } from "./type"

// export reducer
export const paginationReducer = paginationSlice.reducer
// export actions
export { setCurrentPage, setPreviousPage, setNextPage, setMaxPages }
// export selectors
export { selectPagination }
// export types
export type { PaginationState }
