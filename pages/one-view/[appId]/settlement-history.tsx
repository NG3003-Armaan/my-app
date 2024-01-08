import OneViewLayout from "components/OneView/OneViewLayout"
import { API } from "service"
import { PageServerSideProps } from "types"

export default function SettlementHistory(props: PageServerSideProps<typeof getServerSideProps>) {
  const { settlementHistory } = props

  return (
    <OneViewLayout>
      <div className="rounded-md">
        {settlementHistory.length > 0 &&
          settlementHistory.map((data, index) => {
            return (
              <div className="mb-10 flex flex-col rounded-lg border px-6 py-5 shadow-lg" key={index}>
                <div className="flex border-b px-4 py-3">
                  <p className="flex-[0.4]">Settlement Initiated</p>
                  <p className="flex-[0.6] font-medium">Yes</p>
                </div>
                <div className="flex border-b px-4 py-3">
                  <p className="flex-[0.4]">Settlement Date</p>
                  <p className="flex-[0.6] font-medium">{data.settlementStartDate}</p>
                </div>
                <div className="flex border-b px-4 py-3">
                  <p className="flex-[0.4]">Settlement Amount</p>
                  <p className="flex-[0.6] font-medium">{data.amount}</p>
                </div>
                <div className="flex border-b px-4 py-3">
                  <p className="flex-[0.4]">Settlement Raised By</p>
                  <p className="flex-[0.6] font-medium">{data.raisedBy}</p>
                </div>
                <div className="flex border-b px-4 py-3">
                  <p className="flex-[0.4]">% Wavier</p>
                  <p className="flex-[0.6] font-medium">51%</p>
                </div>
                <div className="flex border-b px-4 py-3">
                  <p className="flex-[0.4]">Settlement Remarks</p>
                  <p className="flex-[0.6] font-medium">{data.remarks}</p>
                </div>
                <div className="flex border-b px-4 py-3">
                  <p className="flex-[0.4]">Approved By</p>
                  <p className="flex-[0.6] font-medium">{data.finalApprovalBy}</p>
                </div>
              </div>
            )
          })}
      </div>
    </OneViewLayout>
  )
}

export async function getServerSideProps() {
  try {
    const {
      data: { settlementHistory },
    } = await API.fetchSettlementHistory(1106637)

    return {
      props: {
        settlementHistory,
      },
    }
  } catch (error) {
    return {
      props: {
        settlementHistory: [],
      },
    }
  }
}
