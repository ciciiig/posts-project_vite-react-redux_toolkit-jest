import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Post } from "../posts"
import { PostModalState } from "./"

const initialState: PostModalState = {
  isOpen: false,
  clickedPostId: null,
  originalPost: undefined,
  editedPost: undefined,
}

export const postModalSlice = createSlice({
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
