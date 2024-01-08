import { safelyConvertStringToNumber } from "utils"

export function isAmountGreaterThan50k(amount: string | number) {
  return (safelyConvertStringToNumber(String(amount)) ?? 0) >= 50000
}
