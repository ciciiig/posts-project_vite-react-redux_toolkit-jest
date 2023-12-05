import { Pagination } from "../Pagination"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import { RootState } from "../../../redux/store"
import { clone } from "ramda"

import { fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
// import {
//   selectPagination,
//   setNextPage,
//   setPreviousPage,
// } from "../../../redux/pagination"

jest.mock("../../../redux/hooks", () => ({
  ...jest.requireActual("../../../redux/hooks"),
  useAppSelector: jest.fn(),
  // TODO: do we need to use dispatch for testing?
  useAppDispatch: jest.fn(),
}))

describe("Test <Pagination />", () => {
  const initialState = {
    pagination: {
      currentPage: 1,
      maxPages: 10,
      postNavigation: {
        isPrevBtnDisabled: true,
        isNextBtnDisabled: false,
      },
    },
  } as RootState
  let currentState: RootState

  beforeEach(() => {
    jest.clearAllMocks()

    currentState = clone(initialState)

    jest.mocked(useAppSelector).mockImplementation((fn) => fn(currentState))
  })

  it("when current page is 1 previous arrow button is dissabled", () => {
    render(<Pagination />)
    const prevArrow = screen.queryByText("<<<")

    expect(prevArrow).toBeDisabled()
  })

  it("when current page is more than previous arrow button is enabled", () => {
    currentState.pagination.postNavigation.isPrevBtnDisabled = false

    render(<Pagination />)
    const prevArrow = screen.queryByText("<<<")

    expect(prevArrow).not.toBeDisabled()
  })

  // TODO: can't find a button to test it
  it("when clicked on previous button current page is decremented by 1", () => {
    currentState.pagination.postNavigation.isPrevBtnDisabled = false
    currentState.pagination.currentPage = 3

    const prevArrow = screen.getByRole("button", { name: /<<</i })

    fireEvent.click(prevArrow)

    expect(currentState.pagination.currentPage).toBe(2)
  })
})
