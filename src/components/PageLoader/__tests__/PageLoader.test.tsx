import { PageLoader } from "../PageLoader"
import { useAppSelector } from "../../../redux/hooks"
import { RootState } from "../../../redux/store"
import { clone } from "ramda"

import { render, screen } from "@testing-library/react"
import { current } from "@reduxjs/toolkit"

jest.mock("../../../redux/hooks", () => ({
  ...jest.requireActual("../../../redux/hooks"),
  useAppSelector: jest.fn(),
}))

describe("Test <PageLoader />", () => {
  const initialState = {
    posts: {
      skeletonStatus: "idle",
      error: undefined,
    },
  } as RootState
  let currentState: RootState

  beforeEach(() => {
    jest.clearAllMocks()

    currentState = clone(initialState)

    jest
      .mocked(useAppSelector)
      .mockImplementation((selectorFn) => selectorFn(currentState))
  })

  it("should  not render skeletonAlertContent when skeletonStatus is idle", () => {
    const { container } = render(<PageLoader />)
    expect(container).toMatchSnapshot()
  })
  it("should render skeletonAlertContent with loading when skeletonStatus is loading", () => {
    currentState.posts.skeletonStatus = "loading"

    const { container } = render(<PageLoader />)
    expect(container).toMatchSnapshot()
  })
  it("should render skeletonAlertContent with Error when skeletonStatus is failed", () => {
    currentState.posts.skeletonStatus = "failed"
    currentState.posts.error = "Some error should occure"

    const { container } = render(<PageLoader />)
    expect(container).toMatchSnapshot()
  })
})
