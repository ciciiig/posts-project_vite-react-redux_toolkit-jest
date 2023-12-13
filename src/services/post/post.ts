import { PatchPostArgs } from "./type"

const getPost = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts")
  return await response.json()
}
const patchPost = async ({ signal, post }: PatchPostArgs) => {
  const urlPost = `https://jsonplaceholder.typicode.com/posts/${post.id}`
  // const urlPost = `https://jsonplaceholderzzz.typicode.com/posts/${post.id}`
  const options = {
    method: "PATCH",
    body: JSON.stringify(post),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  }

  const response = await fetch(urlPost, {
    ...options,
    signal,
  })

  return await response.json()
}

export const postService = {
  getPost,
  patchPost,
}
