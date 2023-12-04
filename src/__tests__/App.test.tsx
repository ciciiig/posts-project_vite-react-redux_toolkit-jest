import App from "../App"
import { PostModalWindow } from "../components/PostModalWindow/PostModalWindow"
import { useAppSelector } from "../redux/hooks"
import { Alert } from "../components/Alert/Alert"
import { PageLoader } from "../components/PageLoader/PageLoader"
import { Posts } from "../components/Posts/Posts"

import { render } from "@testing-library/react"
import { RootState } from "../redux/store"
import { clone } from "ramda"

jest.mock("../components/PostModalWindow/PostModalWindow", () => ({
  ...jest.requireActual("../components/PostModalWindow/PostModalWindow"),
  PostModalWindow: jest.fn(),
}))
jest.mock("../redux/hooks", () => ({
  ...jest.requireActual("../redux/hooks"),
  useAppSelector: jest.fn(),
}))
jest.mock("../components/Alert/Alert", () => ({
  ...jest.requireActual("../components/Alert/Alert"),
  Alert: jest.fn(),
}))
jest.mock("../components/PageLoader/PageLoader", () => ({
  ...jest.requireActual("../components/PageLoader/PageLoader"),
  PageLoader: jest.fn(),
}))
jest.mock("../components/Posts/Posts", () => ({
  ...jest.requireActual("../components/Posts/Posts"),
  Posts: jest.fn(),
}))

describe("Test <App />", () => {
  const initialState = {
    postModal: {
      isOpen: true,
    },
  } as RootState
  let currentState: RootState

  beforeEach(() => {
    jest.clearAllMocks()

    currentState = clone(initialState)

    jest.mocked(useAppSelector).mockImplementation((fn) => fn(currentState))
    jest
      .mocked(PostModalWindow)
      .mockImplementation(() => <div>mockedPostModalWindow</div>)
    jest.mocked(Posts).mockImplementation(() => <div>mockedPosts</div>)
    jest
      .mocked(PageLoader)
      .mockImplementation(() => <div>mockedPageLoader</div>)
    jest.mocked(Alert).mockImplementation(() => <div>mockedAlert</div>)
  })

  it("show modal window if isOpen is true", () => {
    const { container } = render(<App />)
    expect(container).toMatchSnapshot()
  })

  it("Don't show modal window if isOpen is false", () => {
    currentState.postModal.isOpen = false

    const { container } = render(<App />)
    expect(container).toMatchSnapshot()
  })
})
