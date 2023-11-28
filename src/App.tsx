import "./App.css"
import { Input } from "./app/components/Input"
import { Pagination } from "./features/pagination/Pagination"
import { PostsList } from "./features/posts/postsComponents/postsList/PostsList"
import { PostModalWindow } from "./features/singlePostWindow/SinglePostWindow"
import { useAppSelector } from "./app/hooks"
import { selectSinglePostWindow } from "./features/singlePostWindow/singlePostWindowSlice"
import { Alert } from "./features/posts/postsComponents/alert/Alert"
import { AlertSkeleton } from "./features/posts/postsComponents/alert-skeleton/AlertSkeleton"

function App() {
  const { isOpen: isPostModalWindowOpen } = useAppSelector(
    selectSinglePostWindow,
  )

  return (
    <div className="app-container" id="app-container">
      {isPostModalWindowOpen && <PostModalWindow />}

      <>
        <Input />
        <PostsList />
        <Pagination />
      </>

      <AlertSkeleton />
      <Alert />
    </div>
  )
}

export default App
