import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import paginationReducer from "../features/pagination/paginationSlice"
import postsReducer from "../features/posts/postsSlice"
import singlePostWindowReducer from "../features/singlePostWindow/singlePostWindowSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    pagination: paginationReducer,
    posts: postsReducer,
    singlePostWindow: singlePostWindowReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
