import "./App.css"

function App() {
  return (
    <div id="app-container" className="app-container">
      <input type="text" id="search-input" className="search-input" size={40} />

      <div className="posts_container" id="posts_container">
        {/* JS inserts posts here */}
        {/* On post click open post modal */}
      </div>
      <div className="post-navigation-container" id="post-navigation-container">
        <button className="arrow" id="left-arrow" disabled>
          {"<<<"}
        </button>
        <span className="page-number" id="page-number">
          1
        </span>
        <button className="arrow" id="right-arrow">
          {">>>"}
        </button>
      </div>
    </div>
  )
}

export default App
