import "./App.css"
import { Input } from "./components/Input/Input"
import { Pagination } from "./components/Pagination/Pagination"
import { PostsList } from "./components/PostsList/PostsList"
import { PostModalWindow } from "./components/PostModalWindow/PostModalWindow"
import { useAppSelector } from "./redux/hooks"
import { selectPostModal } from "./redux/postModal"
import { Alert } from "./components/Alert/Alert"
import { PageLoader } from "./components/PageLoader/PageLoader"

function App() {
  const { isOpen: isPostModalWindowOpen } = useAppSelector(selectPostModal)

  return (
    <div className="app-container" id="app-container">
      {isPostModalWindowOpen && <PostModalWindow />}

      <>
        <Input />
        <PostsList />
        <Pagination />
      </>

      <PageLoader />
      <Alert />
    </div>
  )
}

export default App
