import { Pagination } from "../Pagination"
import { useAppSelector, useAppDispatch } from "../../../redux/hooks"
import { setPreviousPage } from "../../../redux/pagination"
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
  setPreviousPage: jest.fn(),
}))

describe("Test <Pagination />", () => {
  const initialState = {
    pagination: {
      currentPage: 1,
      postNavigation: {
        isPrevBtnDisabled: true,
        isNextBtnDisabled: false,
      },
    },
  } as RootState
  let currentState: RootState
  const mockedDispatch = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    currentState = clone(initialState)

    jest.mocked(useAppSelector).mockImplementation((fn) => fn(currentState))
    jest.mocked(useAppDispatch).mockReturnValue(mockedDispatch)
  })

  it("should disable previous arrow button when current page is 1", () => {
    render(<Pagination />)
    const prevArrow = screen.queryByText("<<<")

    expect(prevArrow).toBeDisabled()
  })

  it("should enable previous arrow when current page is more than 1", () => {
    currentState.pagination.postNavigation.isPrevBtnDisabled = false
    currentState.pagination.currentPage = 2

    render(<Pagination />)
    const prevArrow = screen.queryByText("<<<")

    expect(prevArrow).not.toBeDisabled()
  })

  it("should call setPreviousPage once when clicked on previous button", () => {
    currentState.pagination.postNavigation.isPrevBtnDisabled = false
    currentState.pagination.currentPage = 3

    render(<Pagination />)

    const prevArrow = screen.getByRole("button", { name: /<<</i })

    fireEvent.click(prevArrow)

    expect(setPreviousPage).toHaveBeenCalledTimes(1)
    expect(setPreviousPage).toHaveBeenCalledWith()
  })
})
