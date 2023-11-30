import "./App.css"
import { PostModalWindow } from "./components/PostModalWindow/PostModalWindow"
import { useAppSelector } from "./redux/hooks"
import { selectPostModal } from "./redux/postModal"
import { Alert } from "./components/Alert/Alert"
import { PageLoader } from "./components/PageLoader/PageLoader"
import { Posts } from "./components/Posts/Posts"

function App() {
  const { isOpen: isPostModalWindowOpen } = useAppSelector(selectPostModal)

  return (
    <div className="app-container" id="app-container">
      {isPostModalWindowOpen && <PostModalWindow />}
      <Posts />
      <PageLoader />
      <Alert />
    </div>
  )
}

export default App
