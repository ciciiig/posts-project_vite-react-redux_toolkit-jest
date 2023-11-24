import "./App.css"
import { Pagination } from "./features/pagination/Pagination"
import { PostsList } from "./features/posts/PostsList"
import { SinglePostWindow } from "./features/singlePostWindow/SinglePostWindow"
import config from "../config.json"

function App() {
  return (
    <div className="app-container" id="app-container">
      <input
        type="search"
        id="search-input"
        className="search-input"
        size={40}
        placeholder={config.searchInputPlaceholder}
      />

      <PostsList />
      <SinglePostWindow />
      <Pagination />
    </div>
  )
}

export default App
