import "./App.css"
import { Pagination } from "./features/pagination/Pagination"

function App() {
  return (
    <div className="app-container" id="app-container">
      <input
        type="search"
        id="search-input"
        className="search-input"
        size={40}
      />

      <div className="posts_container" id="posts_container">
        {/* JS inserts posts here */}
        {/* On post click open post modal */}
      </div>
      {/* <div className="post-navigation-container" id="post-navigation-container">
        <button className="arrow" id="left-arrow" disabled>
          {"<<<"}
        </button>
        <span className="page-number" id="page-number">
          1
        </span>
        <button className="arrow" id="right-arrow">
          {">>>"}
        </button>
      </div> */}
      <Pagination />
    </div>
  )
}

export default App
