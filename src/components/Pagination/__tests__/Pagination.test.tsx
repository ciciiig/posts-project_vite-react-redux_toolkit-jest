import { Pagination } from "../Pagination"
import { useAppSelector, useAppDispatch } from "../../../redux/hooks"
import {
  // selectPagination,
  // setNextPage,
  setPreviousPage,
} from "../../../redux/pagination"
import { RootState } from "../../../redux/store"

import { clone } from "ramda"

import { fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

jest.mock("../../../redux/hooks", () => ({
  ...jest.requireActual("../../../redux/hooks"),
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}))
jest.mock("../../../redux/pagination", () => ({
  ...jest.requireActual("../../../redux/pagination"),
  selectPagination: () => jest.fn(),
  setNextPage: () => jest.fn(),
  setPreviousPage: () => jest.fn(),
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
    jest.mocked(useAppDispatch).mockImplementation((fn) => fn(currentState))
    // jest.mocked(selectPagination).
    // jest.mocked(setNextPage).
    jest
      .mocked(setPreviousPage)
      .mockReturnValue((currentState.pagination.currentPage -= 1))
  })

  it("when current page is 1 previous arrow button is dissabled", () => {
    render(<Pagination />)
    const prevArrow = screen.queryByText("<<<")

    expect(prevArrow).toBeDisabled()
  })

  it("when current page is more than previous arrow button is enabled", () => {
    useAppDispatch(setPreviousPage)

    render(<Pagination />)
    const prevArrow = screen.queryByText("<<<")

    expect(prevArrow).not.toBeDisabled()
  })

  // TODO: can't find a button to test it
  it("when clicked on previous button setPreviousPage is called", () => {
    currentState.pagination.postNavigation.isPrevBtnDisabled = false
    currentState.pagination.currentPage = 3

    render(<Pagination />)

    const prevArrow = screen.getByRole("button", { name: /<<</i })

    fireEvent.click(prevArrow)

    const pageNumber = screen.getByText(2)

    expect(pageNumber.textContent).toBe("2")
  })
})
