import { PatchPostArgs } from "../type"
import { postService } from "../post"

describe("Test postService", () => {
  const mockData = [
    {
      userId: 1,
      id: 1,
      title: "title",
      body: "body",
    },
  ]

  describe("test getPost", () => {
    it("should fetch and return posts", async () => {
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockData),
        }),
      )
      const result = await postService.getPost()

      expect(fetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/posts",
      )
      expect(result).toEqual(mockData)
    })
  })

  describe("test patchPost", () => {
    const mockPost = {
      userId: 1,
      id: 1,
      title: "updated title",
      body: "updated body",
    }
    const mockSignal = new AbortController().signal

    it("should send patch and return updated post", async () => {
      const result = await postService.patchPost({
        signal: mockSignal,
        post: mockPost,
      } as PatchPostArgs)

      expect(fetch).toHaveBeenCalledWith(
        `https://jsonplaceholder.typicode.com/posts/${mockPost.id}`,
        {
          method: "PATCH",
          body: JSON.stringify(mockPost),
          headers: { "Content-type": "application/json; charset=UTF-8" },
          signal: mockSignal,
        },
      )
      return expect(result).toEqual(mockData)
    })

    it.only("should catch fails with an error", async () => {
      const mockedError = new Error("Fake error")
      window.fetch = jest.fn().mockRejectedValue(mockedError)

      let expectedResult: any

      try {
        await postService.patchPost({
          signal: mockSignal,
          post: mockPost,
        })
      } catch (error) {
        expectedResult = error
      }

      expect(expectedResult).toEqual(mockedError)
    })
  })
})
