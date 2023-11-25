import "./App.css"
import { Input } from "./app/components/Input"
import { Pagination } from "./features/pagination/Pagination"
import { PostsList } from "./features/posts/PostsList"
import { SinglePostWindow } from "./features/singlePostWindow/SinglePostWindow"

function App() {
  return (
    <div className="app-container" id="app-container">
      <Input />
      <PostsList />
      <SinglePostWindow />
      <Pagination />
    </div>
  )
}

export default App
