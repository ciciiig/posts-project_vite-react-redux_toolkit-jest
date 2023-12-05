import { capitalizeFirstLetter } from "../capitalizeFirstLetter"

it("Capitalizes first letter", () => {
  expect(capitalizeFirstLetter("testingCapitalizeFirstLetter")).toBe(
    "TestingCapitalizeFirstLetter",
  )
})
