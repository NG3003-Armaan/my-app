import { SettlementInfoMapperType } from "service/mapper/settlement"
import { formatAmount, getOrdinalNumber } from "utils"

function InfoPanel({ title, value }: { title: string | number; value: string | number }) {
  return (
    <div className="flex items-center">
      <div className="flex-[0.5]">{title}</div>
      <div className="flex-[0.5] border-b font-semibold">{value}</div>
    </div>
  )
}

export function SettlementInfo(props: SettlementInfoMapperType) {
  return (
    <div className="flex flex-col gap-8">
      <InfoPanel title="Settlement Amount" value={formatAmount(props.settlementAmount)} />
      <InfoPanel title="Settlement type" value={props.settlementType} />
      <InfoPanel title="Deferred Amount" value={formatAmount(props.deferredAmount)} />
      <InfoPanel title="Settlement start date" value={props.settlementStartDate} />
      <InfoPanel title="Mode of payment" value={props.paymentMode} />
      <InfoPanel title="Frequency of payment" value={props.paymentFrequency} />
      {props.paymentDates.map((paymentDate, idx) => {
        return (
          <InfoPanel
            key={paymentDate}
            title={`${getOrdinalNumber(idx + 1)} installment status`}
            value={`Paid successfully on ${paymentDate}`}
          />
        )
      })}
      <InfoPanel title="Waiver %" value={props.wavier} />
      <InfoPanel title="AS Remarks" value={props.asRemarks} />
      <InfoPanel title="Settlement Documents" value={""} />
    </div>
  )
}
