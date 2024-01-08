import { UpdateTrailPayloadMapper, UpdateTrailSettlementPayloadMapper } from "service/mapper/trails"
import { TrailState } from "store/slices/trail"
import { DeferredAmountSchema, SettlementSchema, TrailSchema } from "store/slices/trail/schema"
import { processPayload } from "utils"
import { parseSchema } from "utils/validation"

export function validateCreateTrail(
  payload: Pick<TrailState, "basicInformation" | "settlement" | "secondaryInformation">
) {
  const result = parseSchema(TrailSchema, payload)
  const settlementResult = parseSchema(SettlementSchema, payload.settlement)
  const deferredAmountResult = parseSchema(DeferredAmountSchema, { deferredAmount: payload.settlement.deferredAmount })

  // Not Settlement requested
  if (payload.basicInformation.disposition !== "8") {
    return {
      ...result,
      invalidFields: {
        basicInformation: result.invalidFields.basicInformation,
        secondaryInformation: result.invalidFields.secondaryInformation,
      },
    }
  }

  // Deferred settlement
  if (!Object.is(Number(payload.settlement.settlementType), NaN) && Number(payload.settlement.settlementType) === 1) {
    return {
      isValid: result.isValid && settlementResult.isValid && deferredAmountResult.isValid,
      invalidFields: {
        ...result.invalidFields,
        settlement: {
          ...settlementResult.invalidFields,
          ...deferredAmountResult.invalidFields,
        },
      },
    }
  }

  return {
    isValid: result.isValid && settlementResult.isValid,
    invalidFields: {
      basicInformation: result.invalidFields.basicInformation,
      secondaryInformation: result.invalidFields.secondaryInformation,
      settlement: settlementResult.invalidFields,
    },
  }
}

export function getCreateTrailPayload(
  payload: Pick<TrailState, "basicInformation" | "secondaryInformation" | "settlement">
) {
  const basicInformation = processPayload(payload, UpdateTrailPayloadMapper) as object
  const settlementDetails = processPayload(payload, UpdateTrailSettlementPayloadMapper) as object

  if (payload.basicInformation.disposition !== "8") {
    return basicInformation
  }

  return {
    ...basicInformation,
    ...settlementDetails,
  }
}
