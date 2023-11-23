import "./App.css"
import { Pagination } from "./features/pagination/Pagination"
import { PostsList } from "./features/posts/PostsList"

function App() {
  return (
    <div className="app-container" id="app-container">
      <input
        type="search"
        id="search-input"
        className="search-input"
        size={40}
      />

      <PostsList />
      <Pagination />
    </div>
  )
}

export default App
