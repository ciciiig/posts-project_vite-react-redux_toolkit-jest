import { PayloadAction } from "@reduxjs/toolkit"

export type PostsState = {
  allPosts: Post[]
  skeletonStatus: "idle" | "loading" | "failed"
  status: "idle" | "loading" | "failed"
  error: string | undefined
  currentPosts: Post[]
  maxPostsPerPage: number
  searchValue: string
  patchRequests: { [key in string]: Promise<PayloadAction> }
}

export type Post = {
  userId: number
  id: number
  title: string
  body: string
}
