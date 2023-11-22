import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export interface PaginationState {
  currentPage: number
  maxPages: number
  postNavigation: {
    isPrevBtnDisabled: boolean
    isNextBtnDisabled: boolean
  }
}

const initialState: PaginationState = {
  currentPage: 1,
  maxPages: 3,
  postNavigation: {
    isPrevBtnDisabled: true,
    isNextBtnDisabled: false,
  },
}

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
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
  },
})

export const { setPreviousPage, setNextPage } = paginationSlice.actions

export const selectPagination = (state: RootState) => state.pagination

export default paginationSlice.reducer
