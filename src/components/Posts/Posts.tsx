import { FC } from "react"
import { Input } from "../Input/Input"
import { PostsList } from "../PostsList/PostsList"
import { Pagination } from "../Pagination/Pagination"

export const Posts: FC = () => {
  return (
    <>
      <Input />
      <PostsList />
      <Pagination />
    </>
  )
}
