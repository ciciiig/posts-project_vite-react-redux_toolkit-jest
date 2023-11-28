import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { PaginationState } from "./type"

const initialState: PaginationState = {
  currentPage: 1,
  maxPages: 10,
  postNavigation: {
    isPrevBtnDisabled: true,
    isNextBtnDisabled: false,
  },
}

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage(
      state,
      action: PayloadAction<PaginationState["currentPage"]>,
    ) {
      state.currentPage = action.payload
    },
    setPreviousPage(state) {
      state.currentPage -= 1
      if (state.currentPage <= 1) {
        state.postNavigation.isPrevBtnDisabled = true
      }
      if (state.currentPage <= state.maxPages) {
        state.postNavigation.isNextBtnDisabled = false
      }
    },
    setNextPage(state) {
      state.currentPage += 1
      if (state.currentPage >= state.maxPages) {
        state.postNavigation.isNextBtnDisabled = true
      }
      if (state.currentPage >= 1) {
        state.postNavigation.isPrevBtnDisabled = false
      }
    },
    setMaxPages(state, action: PayloadAction<number>) {
      state.maxPages = action.payload
    },
  },
})
