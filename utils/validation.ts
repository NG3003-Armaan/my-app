import _ from "lodash"
import moment from "moment"
import { BaseSchema, custom, Issues, minLength, safeParse as parse, ParseInfo, string } from "valibot"
import validator from "validator"

export type InvalidField = { isInvalid: boolean; errorMessage: string }

type CreateRecursiveObject<T> = T extends Array<unknown>
  ? [CreateRecursiveObject<T[number]>]
  : T extends object
    ? { [K in keyof T]: CreateRecursiveObject<T[K]> }
    : InvalidField

export function rawTransformDataToErrorObject<T>(
  data: T
): Array<InvalidField> | InvalidField | Record<string, InvalidField> {
  if (Array.isArray(data)) {
    const result = []

    for (const e of data) {
      result.push(transformDataToErrorObject(e))
    }

    return result
  }

  if (data !== null && typeof data === "object") {
    const result = {} as any

    for (const [key, value] of Object.entries(data)) {
      result[key] = rawTransformDataToErrorObject(value)
    }

    return result
  }

  return { isInvalid: false, errorMessage: "" }
}

export function transformDataToErrorObject<T>(data: T): CreateRecursiveObject<T> {
  return rawTransformDataToErrorObject(data) as CreateRecursiveObject<T>
}

// TODO - we have to handle array of stuff here
function buildNestedErrorObject(pathStr: string, errorResult: { errorMessage: string; isInvalid: boolean }) {
  const paths = pathStr.split(".")

  const result: Record<(typeof paths)[number], object> = {}

  let current = result

  for (let idx = 0; idx < paths.length; ++idx) {
    current[paths[idx]] = idx === paths.length - 1 ? errorResult : {}
    current = current[paths[idx]] as Record<(typeof paths)[number], object>
  }

  return result
}

function buildInvalidFieldErrorObject(issues: Issues) {
  let result = {}

  for (const issue of issues) {
    if (!issue || !issue.path) {
      continue
    }

    result = _.merge(
      result,
      buildNestedErrorObject(issue.path.map((path) => path.key).join("."), {
        errorMessage: issue.message,
        isInvalid: Boolean(issue.message),
      })
    )
  }

  return result
}

export function parseSchema<TSchema extends BaseSchema, TInput extends object>(
  schema: TSchema,
  input: TInput,
  info?: Pick<ParseInfo, "abortEarly" | "abortPipeEarly" | "skipPipe">
) {
  const result = parse(schema, input, { abortPipeEarly: false, ...info })

  const invalidFields = result.success
    ? transformDataToErrorObject(input)
    : _.merge({}, transformDataToErrorObject(input), buildInvalidFieldErrorObject(result.issues))

  return {
    isValid: result.success,
    invalidFields,
  }
}

export function isInvalidForm(
  invalidFields: Array<InvalidField> | InvalidField | Record<string, InvalidField>
): boolean {
  if (Array.isArray(invalidFields)) {
    return invalidFields.some((field) => isInvalidForm(field))
  }

  if (typeof invalidFields === "object") {
    if ("isInvalid" in invalidFields && typeof invalidFields["isInvalid"] === "boolean") {
      return invalidFields["isInvalid"]
    }

    return Object.entries(invalidFields).some((field) => isInvalidForm(field))
  }

  return false
}

export const createCustomStringSchema = ({
  validator,
  errorMessage,
}: {
  validator: Validators
  errorMessage: string
}) => string([custom((value: string) => validate(value).is.valid(validator), errorMessage)])

export const createMasterDataIdSchema = (errorMessage: string) => string(errorMessage, [minLength(1, errorMessage)])

export const isValidValue = (value: any) =>
  value !== null && value !== undefined && value !== "" && !Object.is(value, NaN)

const validators = {
  pincode: (value: string) => validator.isNumeric(value) && String(value).length === 6,
  gstin: (value: string) =>
    /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/.test(value as string) && value.length === 15,
  pan: (value: string) => /[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(value as string) && String(value).length === 10,
  date: (date: string) => moment(date, "YYYY-MM-DD", true).isValid(),
  mobileNumber: (value: string) => validator.isMobilePhone(String(value), "en-IN"),
  number: (value: string) => validator.isNumeric(value),
}

type Validators = keyof typeof validators

export function validate(value: any) {
  return {
    is: {
      not: {
        valid: (type: Validators) => {
          if (!validators[type]) {
            throw new Error("Invalid validate type passed.")
          }

          return !(validators[type](value) && isValidValue(value))
        },
      },
      valid: (type: Validators) => {
        if (!validators[type]) {
          throw new Error("Invalid validate type passed.")
        }

        return validators[type](value) && isValidValue(value)
      },
    },
  }
}
