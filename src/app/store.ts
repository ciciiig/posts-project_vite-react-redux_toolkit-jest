import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import paginationReducer from "../features/pagination/paginationSlice"
import postsReducer from "../features/posts/postsSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    pagination: paginationReducer,
    posts: postsReducer,
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
