import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { Post } from "../posts/postsSlice"

export interface SinglePostWindowState {
  isOpen: boolean
  clickedPostId: number | null
  originalPost: Post | undefined
  editedPost: Post | undefined
}

const initialState: SinglePostWindowState = {
  isOpen: false,
  clickedPostId: null,
  originalPost: undefined,
  editedPost: undefined,
}

export const singlePostWindowSlice = createSlice({
  name: "singlePostWindow",
  initialState,
  reducers: {
    setClickedPostId: (state, action: PayloadAction<number>) => {
      state.clickedPostId = action.payload
    },
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload
    },
    setOriginalPost: (state, action: PayloadAction<Post>) => {
      state.originalPost = { ...action.payload }
    },
    setEditedPost: (state, action: PayloadAction<Post>) => {
      state.editedPost = { ...action.payload }
    },
  },
})

export const { setClickedPostId, setIsOpen, setOriginalPost, setEditedPost } =
  singlePostWindowSlice.actions

export const selectSinglePostWindow = (state: RootState) =>
  state.singlePostWindow

export default singlePostWindowSlice.reducer
