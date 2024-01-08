import { Stack } from "components"
import OneViewLayout from "components/OneView/OneViewLayout"
import { API } from "service"
import { PageServerSideProps } from "types"

export default function data(props: PageServerSideProps<typeof getServerSideProps>) {
  const { loanDetails } = props

  return (
    <OneViewLayout>
      <div className="rounded-md border">
        <Stack>
          {loanDetails && (
            <div className="flex flex-col rounded px-6 py-5">
              <div className="flex border-b px-4 py-3">
                <p className="flex-[0.4]">Loan Amount</p>
                <p className="flex-[0.6] font-medium">20 Lakhs</p>
              </div>
              <div className="flex border-b px-4 py-3">
                <p className="flex-[0.4]">EMI</p>
                <p className="flex-[0.6] font-medium">{loanDetails.emi}</p>
              </div>
              <div className="flex border-b px-4 py-3">
                <p className="flex-[0.4]">Repayment</p>
                <p className="flex-[0.6] font-medium">Daily</p>
              </div>
              <div className="flex border-b px-4 py-3">
                <p className="flex-[0.4]">Current DPD</p>
                <p className="flex-[0.6] font-medium">{loanDetails.dpd}</p>
              </div>
              <div className="flex border-b px-4 py-3">
                <p className="flex-[0.4]">BOM DPD</p>
                <p className="flex-[0.6] font-medium">42</p>
              </div>
              <div className="flex border-b px-4 py-3">
                <p className="flex-[0.4]">MCR</p>
                <p className="flex-[0.6] font-medium">1.50 Lakhs</p>
              </div>
              <div className="flex border-b px-4 py-3">
                <p className="flex-[0.4]">PBAL</p>
                <p className="flex-[0.6] font-medium">{loanDetails.pbal}</p>
              </div>
              <div className="flex border-b px-4 py-3">
                <p className="flex-[0.4]">Lbal</p>
                <p className="flex-[0.6] font-medium">{loanDetails.lbal}</p>
              </div>
              <div className="flex border-b px-4 py-3">
                <p className="flex-[0.4]">AREP Amount</p>
                <p className="flex-[0.6] font-medium">2.5 Lakhs</p>
              </div>
              <div className="flex border-b px-4 py-3">
                <p className="flex-[0.4]">EXPR Amount</p>
                <p className="flex-[0.6] font-medium">4.5 Lakhs</p>
              </div>
              <div className="flex border-b px-4 py-3">
                <p className="flex-[0.4]">Total OverDue</p>
                <p className="flex-[0.6] font-medium">6.5 Lakhs</p>
              </div>
            </div>
          )}
        </Stack>
      </div>
    </OneViewLayout>
  )
}

export async function getServerSideProps() {
  try {
    const {
      data: { loanDetails },
    } = await API.fetchLoanDetails(1108197)

    return {
      props: {
        loanDetails,
      },
    }
  } catch (error) {
    return {
      props: {
        loanDetails: null,
      },
    }
  }
}
