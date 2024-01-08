export type ValidationResult = { isInvalid: boolean; errorMessage: string }

type RawValidationResults<T> = T extends Array<unknown>
  ? [RawValidationResults<T[number]>]
  : T extends Record<string, unknown>
    ? { [K in keyof T]: RawValidationResults<T[K]> }
    : ValidationResult

export type ValidationResults<T extends { invalidFields: unknown }> = RawValidationResults<Omit<T, "invalidFields">>
