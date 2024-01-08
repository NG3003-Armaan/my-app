import { OptionType } from "components/SelectInput/SelectInput"

export type MasterDataDropDownInputType = {
  id: number
  value: string
}

export function processMasterData(data: Array<MasterDataDropDownInputType>) {
  return data.map(convertTrailMasterDataToOptionType)
}

export function convertTrailMasterDataToOptionType(data: MasterDataDropDownInputType): OptionType {
  return {
    id: data.id,
    value: data.id,
    title: data.value,
  }
}
