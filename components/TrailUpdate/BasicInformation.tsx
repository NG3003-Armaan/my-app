import FormInput from "components/Form/FormInput"
import Heading from "components/Heading/Heading"
import { OptionType } from "components/SelectInput/SelectInput"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { trailAction, TrailState } from "store/slices/trail"

interface BasicInformationProps {
  masterData: {
    settlementTypes: Array<OptionType>
    connectivity: Array<OptionType>
    trailType: Array<OptionType>
    dispositions: Array<OptionType>
    reasonForNonPayment: Array<OptionType>
    nextAction: Array<OptionType>
  }
  disabled: boolean
}

export default function BasicInformation(props: BasicInformationProps) {
  const {
    connectivity,
    trailType,
    additionalRemarks,
    disposition,
    nextAction,
    ptpAmount,
    ptpDate,
    reasonForNonPayment,
  } = useAppSelector<TrailState["basicInformation"]>((state) => state.trail.basicInformation)

  const { disabled, masterData } = props

  const invalidFields = useAppSelector<TrailState["invalidFields"]["basicInformation"]>(
    (state) => state.trail.invalidFields.basicInformation
  )
  const dispatch = useAppDispatch()

  return (
    <>
      <div className="mb-8 flex flex-row items-center justify-between border-b-2 border-b-primary pb-4">
        <Heading className=" underline" size={"xl"}>
          Basic Information
        </Heading>
      </div>
      <div className="ml-16 max-w-[800px]">
        <div className={"flex flex-col gap-10"}>
          <FormInput.SelectInput
            label="Connectivity"
            title="Select Connectivity"
            {...invalidFields.connectivity}
            options={masterData.connectivity}
            value={connectivity}
            onChange={(e) => dispatch(trailAction.setConnectivity(e.target.value))}
            disabled={disabled}
          />
          <FormInput.SelectInput
            label="Trail type"
            title="Select Trail Type"
            {...invalidFields.trailType}
            options={masterData.trailType}
            value={trailType}
            onChange={(e) => dispatch(trailAction.setTrailType(e.target.value))}
            disabled={disabled}
          />
          <FormInput.SelectInput
            label="Disposition"
            title="Select Disposition"
            {...invalidFields.disposition}
            options={masterData.dispositions}
            value={disposition}
            onChange={(e) => dispatch(trailAction.setDisposition(e.target.value))}
            disabled={disabled}
          />
          {disposition === "8" && <SettlementDetails settlementTypes={masterData.settlementTypes} />}
          <FormInput.TextArea
            label="Additional remarks"
            placeholder="Enter Additional remarks"
            {...invalidFields.additionalRemarks}
            value={additionalRemarks}
            onChange={(e) => dispatch(trailAction.setAdditionalRemarks(e.target.value))}
            disabled={disabled}
          />
          <FormInput.SelectInput
            label="Reason for non-payment"
            title="Select Reason for non-payment"
            {...invalidFields.reasonForNonPayment}
            options={masterData.reasonForNonPayment}
            value={reasonForNonPayment}
            onChange={(e) => dispatch(trailAction.setReasonForNonPayment(e.target.value))}
            disabled={disabled}
          />
          <FormInput.SelectInput
            label="Next action"
            title="Select Next action"
            {...invalidFields.nextAction}
            options={masterData.nextAction}
            value={nextAction}
            onChange={(e) => dispatch(trailAction.setNextAction(e.target.value))}
            disabled={disabled}
          />
          <FormInput.Date
            label="PTP Date"
            title="Select PTP Date"
            {...invalidFields.ptpDate}
            value={ptpDate}
            onChange={(e) => dispatch(trailAction.setPtpDate(e.target.value))}
            disabled={disabled}
          />
          <FormInput.Text
            label="PTP Amount"
            placeholder="Enter PTP Amount"
            {...invalidFields.ptpAmount}
            value={ptpAmount}
            onChange={(e) => dispatch(trailAction.setPtpAmount(e.target.value))}
            disabled={disabled}
          />
        </div>
      </div>
    </>
  )
}

function SettlementDetails(props: { settlementTypes: Array<OptionType> }) {
  const { settlementAmount, settlementType, settlementStartDate, deferredAmount, paymentMode, paymentFrequency } =
    useAppSelector<TrailState["settlement"]>((state) => state.trail.settlement)

  const invalidFields = useAppSelector<TrailState["invalidFields"]["settlement"]>(
    (state) => state.trail.invalidFields.settlement
  )

  const dispatch = useAppDispatch()

  return (
    <div className="flex flex-col gap-10">
      <FormInput.Text
        label="Settlement Amount"
        placeholder="Enter Amount"
        {...invalidFields.settlementAmount}
        value={settlementAmount}
        onChange={(e) => dispatch(trailAction.setSettlementAmount(e.target.value))}
      />
      <FormInput.SelectInput
        label="Settlement Type"
        title="Select Settlement Type"
        {...invalidFields.settlementType}
        options={props.settlementTypes}
        value={settlementType}
        onChange={(e) => dispatch(trailAction.setSettlementType(e.target.value))}
      />
      {settlementType === "1" && (
        <FormInput.Text
          label="Deferred Amount"
          placeholder="Enter Amount"
          {...invalidFields.deferredAmount}
          value={deferredAmount}
          onChange={(e) => dispatch(trailAction.setDeferredAmount(e.target.value))}
        />
      )}
      <FormInput.Date
        label="Settlement Start Date"
        placeholder="Select Date"
        {...invalidFields.settlementStartDate}
        value={settlementStartDate}
        onChange={(e) => dispatch(trailAction.setSettlementStartDate(e.target.value))}
      />
      <FormInput.Text
        label="Payment Mode"
        placeholder="Enter payment mode"
        {...invalidFields.paymentMode}
        value={paymentMode}
        onChange={(e) => dispatch(trailAction.setPaymentMode(e.target.value))}
      />
      <FormInput.Number
        min={1}
        label="Payment Frequency"
        placeholder="Enter payment frequency"
        {...invalidFields.paymentFrequency}
        value={paymentFrequency}
        onChange={(e) => dispatch(trailAction.setPaymentFrequency(Number(e.target.value)))}
      />
    </div>
  )
}
