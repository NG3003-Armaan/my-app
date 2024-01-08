import { transformDataToErrorObject } from "./validation"

describe("createErrorObj", () => {
  it("should parse object", () => {
    expect(transformDataToErrorObject({ name: "testing" })).toStrictEqual({
      name: { isInvalid: false, errorMessage: "" },
    })
  })
  it("should parse array of object", () => {
    expect(transformDataToErrorObject([{ name: "testing" }])).toStrictEqual([
      { name: { isInvalid: false, errorMessage: "" } },
    ])
  })
  it("should parse object and array", () => {
    expect(transformDataToErrorObject({ users: [{ name: "testing" }] })).toStrictEqual({
      users: [{ name: { isInvalid: false, errorMessage: "" } }],
    })
  })
  it("should return invalid if null is passed", () => {
    expect(transformDataToErrorObject(null)).toStrictEqual({
      isInvalid: false,
      errorMessage: "",
    })
  })
  it("should return invalid if undefined is passed", () => {
    expect(transformDataToErrorObject(undefined)).toStrictEqual({
      isInvalid: false,
      errorMessage: "",
    })
  })
  it("should return invalid if number is passed", () => {
    expect(transformDataToErrorObject(1)).toStrictEqual({
      isInvalid: false,
      errorMessage: "",
    })
  })
  it("should return invalid if string is passed", () => {
    expect(transformDataToErrorObject("testing")).toStrictEqual({
      isInvalid: false,
      errorMessage: "",
    })
  })
})
