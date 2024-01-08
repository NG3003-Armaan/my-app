import { Table } from "@radix-ui/themes"
import DateRange from "components/DateRange/DateRange"
import OneViewLayout from "components/OneView/OneViewLayout"
import { API } from "service"
import { PageServerSideProps } from "types"

export default function PaymentHistory(props: PageServerSideProps<typeof getServerSideProps>) {
  const { paymentHistory } = props

  return (
    <OneViewLayout>
      <div>
        <DateRange />
        <Table.Root className="ng-stickyTable mt-6 bg-green-400" size="3" variant="surface">
          <Table.Header>
            <Table.Row className="text-center" style={{ color: "var(--primary)" }}>
              <Table.ColumnHeaderCell>Payment Date</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Mode of Payment</Table.ColumnHeaderCell>
              {/* <Table.ColumnHeaderCell>Collector</Table.ColumnHeaderCell> */}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {paymentHistory.length > 0 &&
              paymentHistory.map((data) => {
                return (
                  <Table.Row className="py-2 text-center" key={data.date}>
                    <Table.Cell> {data.date}</Table.Cell>
                    <Table.Cell>{data.amount}</Table.Cell>
                    <Table.Cell>{data.source}</Table.Cell>
                    {/* <Table.Cell>{data.collector}</Table.Cell> */}
                  </Table.Row>
                )
              })}
          </Table.Body>
        </Table.Root>
      </div>
    </OneViewLayout>
  )
}

export async function getServerSideProps() {
  try {
    const {
      data: { paymentHistory },
    } = await API.fetchPaymentHistory(1072077)

    return {
      props: {
        paymentHistory,
      },
    }
  } catch (error) {
    return {
      props: {
        paymentHistory: [],
      },
    }
  }
}
