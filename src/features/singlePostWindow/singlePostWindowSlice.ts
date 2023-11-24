import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { Posts } from "../posts/postsSlice"

export interface SinglePostWindowState {
  isOpen: boolean
  clickedPostId: number | null
  originalPost: Posts | undefined
  editedPost: Posts | undefined
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
    setOriginalPost: (state, action: PayloadAction<Posts>) => {
      state.originalPost = { ...action.payload }
    },
    setEditedPost: (state, action: PayloadAction<Posts>) => {
      state.editedPost = { ...action.payload }
    },
  },
})

export const { setClickedPostId, setIsOpen, setOriginalPost, setEditedPost } =
  singlePostWindowSlice.actions

export const selectSinglePostWindow = (state: RootState) =>
  state.singlePostWindow

export default singlePostWindowSlice.reducer
