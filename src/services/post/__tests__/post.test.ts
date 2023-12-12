import { PatchPostArgs } from "../type"
import { postService } from "../post"

describe("Test postService", () => {
  const mockedData = [
    {
      userId: 1,
      id: 1,
      title: "title",
      body: "body",
    },
  ]

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockedData),
      }),
    )
  })

  it("should fetch and return posts", async () => {
    const result = await postService.getPost()

    expect(fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts",
    )
    expect(result).toEqual(mockedData)
  })

  it("should send patch and return updated post", async () => {
    const mockedPost = {
      userId: 1,
      id: 1,
      title: "updated title",
      body: "updated body",
    }
    const mockedSignal = new AbortController().signal
    const result = await postService.patchPost({
      signal: mockedSignal,
      post: mockedPost,
    } as PatchPostArgs)

    expect(result).toEqual(mockedData)
    expect(fetch).toHaveBeenCalledWith(
      `https://jsonplaceholder.typicode.com/posts/${mockedPost.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(mockedPost),
        headers: { "Content-type": "application/json; charset=UTF-8" },
        signal: mockedSignal,
      },
    )
  })
})
