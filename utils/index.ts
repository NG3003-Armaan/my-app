import _ from "lodash"
import * as ObjectMapper from "object-mapper"

export function processPayload<ReturnType>(payload: unknown, mapper = {}) {
  return ObjectMapper.merge((payload as object) ?? {}, mapper) as ReturnType
}

export function clampToRange(value: number) {
  return Math.max(0, Math.min(value, 100))
}

// TODO - add unit test for this
export function findPercentage({ value, total }: { value: number; total: number }) {
  return (value / total) * 100
}

export function safelyConvertStringToNumber(str: string) {
  const number = parseFloat(str)

  return !isNaN(number) ? number : null
}

export function getOrdinalNumber(number: number): string {
  if (number < 1) {
    return String(number)
  }

  const suffixes: { [key: number]: string } = {
    1: "st",
    2: "nd",
    3: "rd",
  }

  const lastDigit = number % 10
  const lastTwoDigits = number % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return number + "th"
  }

  const suffix = suffixes[lastDigit] || "th"
  return number + suffix
}

export function formatAmount(amount: number): string {
  return amount.toLocaleString("en-IN")
}
