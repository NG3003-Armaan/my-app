import { Heading } from "@radix-ui/themes"
import Button from "components/Button/Button"
import { DateInput } from "components/Form/FormInput"
import Icon from "components/Icon/Icon"
import Input from "components/Input/Input"
import SelectInput, { SelectInputDefaultValue } from "components/SelectInput/SelectInput"
import { criticalities, priorityBuckets, propensities, resolutionRates } from "data"
import { Criticality, PriorityBucket, Propensity, ResolutionRate } from "enums"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { allocationActions, AllocationState, initialState } from "store/slices/allocation"

export default function AdvanceFilter({ handleClearFilter }: { handleClearFilter: () => void }) {
  const dispatch = useAppDispatch()
  const { appId, allocationDate, dpd, priorityBucket, resolutionRate, propensity, criticality } = useAppSelector<
    AllocationState["advanceFilter"]
  >((state) => state.allocation.advanceFilter)
  return (
    <>
      <Heading className="text-xl underline">Advanced Filter</Heading>
      <div className="py-4">
        <div className="flex items-center justify-between py-2">
          <label className="w-[40%] pr-4 font-semibold text-primary">APP ID</label>
          <div className="flex w-[60%] items-center">
            <Input
              value={appId}
              onChange={(e) => {
                //TODO number validation
                dispatch(allocationActions.setAdvanceFilterAppId(e.target.value))
              }}
              className="flex-1"
            />
            {appId && (
              <div onClick={() => dispatch(allocationActions.setAdvanceFilterAppId(""))}>
                <Icon name="close" className="ml-2 cursor-pointer text-lg text-danger-red" />
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between py-2">
          <label className="w-[40%] pr-4 font-semibold text-primary">Allocation Date</label>
          <div className="flex w-[60%] items-center">
            <div className="flex-1 overflow-hidden rounded-md border border-muted-gray focus-within:border-primary">
              <DateInput
                value={allocationDate}
                onChange={(e) => {
                  dispatch(allocationActions.setAdvanceFilterAllocationDate(e.target.value))
                }}
              />
            </div>
            {allocationDate && (
              <div onClick={() => dispatch(allocationActions.setAdvanceFilterAllocationDate(""))}>
                <Icon name="close" className="ml-2 cursor-pointer text-lg text-danger-red" />
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between py-2">
          <label className="w-[40%] pr-4 font-semibold text-primary">DPD</label>
          <div className="flex w-[60%] items-center">
            <SelectInput
              title="Select DPD"
              value={dpd}
              onChange={(e) => {
                dispatch(allocationActions.setAdvanceFilterDbd(e.target.value))
              }}
              options={priorityBuckets}
              className="flex-1 border border-muted-gray focus-within:border-primary"
            />
            {dpd && dpd !== SelectInputDefaultValue && (
              <div onClick={() => dispatch(allocationActions.setAdvanceFilterDbd(""))}>
                <Icon name="close" className="ml-2 cursor-pointer text-lg text-danger-red" />
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between py-2">
          <label className="w-[40%] pr-4 font-semibold text-primary">Priority Bucket</label>
          <div className="flex w-[60%] items-center">
            <SelectInput
              title="Select Priority Bucket"
              value={priorityBucket}
              onChange={(e) => {
                dispatch(allocationActions.setAdvanceFilterPriorityBucket(e.target.value as PriorityBucket))
              }}
              options={priorityBuckets}
              className="flex-1 border border-muted-gray focus-within:border-primary"
            />
            {priorityBucket && priorityBucket !== SelectInputDefaultValue && (
              <div onClick={() => dispatch(allocationActions.setAdvanceFilterPriorityBucket(SelectInputDefaultValue))}>
                <Icon name="close" className="ml-2 cursor-pointer text-lg text-danger-red" />
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between py-2">
          <label className="w-[40%] pr-4 font-semibold text-primary">Resolution Rate</label>
          <div className="flex w-[60%] items-center">
            <SelectInput
              title="Select Resolution Rate"
              value={resolutionRate}
              onChange={(e) => {
                dispatch(allocationActions.setAdvanceFilterResolutionRate(e.target.value as ResolutionRate))
              }}
              options={resolutionRates}
              className="flex-1 border border-muted-gray focus-within:border-primary"
            />
            {resolutionRate && resolutionRate !== SelectInputDefaultValue && (
              <div onClick={() => dispatch(allocationActions.setAdvanceFilterResolutionRate(SelectInputDefaultValue))}>
                <Icon name="close" className="ml-2 cursor-pointer text-lg text-danger-red" />
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between py-2">
          <label className="w-[40%] pr-4 font-semibold text-primary">Propensity</label>
          <div className="flex w-[60%] items-center">
            <SelectInput
              title="Select Propensity"
              value={propensity}
              onChange={(e) => {
                dispatch(allocationActions.setAdvanceFilterPropensity(e.target.value as Propensity))
              }}
              options={propensities}
              className="flex-1 border border-muted-gray focus-within:border-primary"
            />
            {propensity && propensity !== SelectInputDefaultValue && (
              <div onClick={() => dispatch(allocationActions.setAdvanceFilterPropensity(SelectInputDefaultValue))}>
                <Icon name="close" className="ml-2 cursor-pointer text-lg text-danger-red" />
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between py-2">
          <label className="w-[40%] pr-4 font-semibold text-primary">Criticality</label>
          <div className="flex w-[60%] items-center">
            <SelectInput
              title="Select Criticality"
              value={criticality}
              onChange={(e) => {
                dispatch(allocationActions.setAdvanceFilterCriticality(e.target.value as Criticality))
              }}
              options={criticalities}
              className="flex-1 border border-muted-gray focus-within:border-primary"
            />
            {criticality && criticality !== SelectInputDefaultValue && (
              <div onClick={() => dispatch(allocationActions.setAdvanceFilterCriticality(SelectInputDefaultValue))}>
                <Icon name="close" className="ml-2 cursor-pointer text-lg text-danger-red" />
              </div>
            )}
          </div>
        </div>
      </div>
      {(appId || allocationDate || dpd || priorityBucket || resolutionRate || propensity || criticality) && (
        <div className="text-center">
          <Button
            onClick={() => {
              dispatch(allocationActions.clearAdvanceFilter(initialState.advanceFilter))
              handleClearFilter()
            }}
          >
            Clear All Filter
          </Button>
        </div>
      )}
    </>
  )
}
