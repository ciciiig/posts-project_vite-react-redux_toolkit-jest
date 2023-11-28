import { configureStore } from "@reduxjs/toolkit"
import { paginationReducer } from "./pagination"
import { postsReducer } from "./posts"
import { postModalReducer } from "./postModal"

export const store = configureStore({
  reducer: {
    pagination: paginationReducer,
    posts: postsReducer,
    singlePostWindow: postModalReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
