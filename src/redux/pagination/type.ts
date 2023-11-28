export type PaginationState = {
  currentPage: number
  maxPages: number
  postNavigation: {
    isPrevBtnDisabled: boolean
    isNextBtnDisabled: boolean
  }
}
