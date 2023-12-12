import { postService } from "../post"

describe("Test postService", () => {
  const data = [
    {
      userId: 1,
      id: 1,
      title:
        "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    },
  ]

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(data),
      }),
    )
  })

  it("Get post fetches and returns posts", async () => {
    const result = await postService.getPost()

    expect(fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts",
    )
    expect(result).toEqual(data)
  })
})
