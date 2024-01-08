import Link from "next/link"
import Divider from "components/Divider/Divider"
import Heading from "components/Heading/Heading"
import { ApplicationType } from "store/slices/application"

const CustomerDetail = ({ label, value }: { label: string; value: string }) => {
  return (
    <div>
      <p className="mb-1 text-mine-shaft">{label}</p>
      <p className="font-medium underline">{value}</p>
    </div>
  )
}

type Props = { application: ApplicationType }

export default function AppDetail({ application }: Props) {
  const { appId, customerId, dpdBucket, firstName, lastName, loanAmount, overDueAmount, pBal } = application
  if (!appId) return

  return (
    <div className="mt-5">
      <Heading className="pt-2 font-medium">Customer Name:</Heading>
      <Heading className="pb-2 font-medium text-primary">
        {firstName} {lastName}
      </Heading>
      <Divider className="bg-primary" />
      <div className="flex justify-around p-3">
        <CustomerDetail label={"App ID:"} value={appId} />
        <CustomerDetail label={"Cust ID:"} value={customerId} />
      </div>
      <div className="flex justify-around p-3">
        <CustomerDetail label={"DPD Bucket:"} value={dpdBucket} />
        <CustomerDetail label={"Overdue amount"} value={overDueAmount} />
      </div>
      <div className="flex justify-around p-3">
        <CustomerDetail label={"Loan Amount:"} value={loanAmount} />
        <CustomerDetail label={"PBAL:"} value={pBal} />
      </div>
      <div className="mt-20">
        <Link href={`/one-view/${appId}/summary`} className="w-full text-center underline">
          Click here to access one view
        </Link>
      </div>
    </div>
  )
}
