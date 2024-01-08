import { Table } from "@radix-ui/themes"
import DateRange from "components/DateRange/DateRange"
import OneViewLayout from "components/OneView/OneViewLayout"

const allocationHistory = [
  {
    id: "1",
    connectedOn: "20/06/2023",
    mode: "Email",
    stage: "Due Amount",
    status: "Delivered",
  },
  {
    id: "2",
    mode: "Email",
    connectedOn: "30/06/2023",
    stage: "Payment",
    status: "Returned",
  },
  {
    id: "3",
    mode: "Sms",
    connectedOn: "30/06/2023",
    stage: "Settlement",
    status: "Failed",
  },
  {
    id: "4",
    mode: "Bot",
    connectedOn: "30/06/2023",
    stage: "Receipt",
    status: "Delivered",
  },
]

export default function ConnectHistory() {
  return (
    <OneViewLayout>
      <div>
        <DateRange />
        <Table.Root className="ng-stickyTable mt-6 bg-green-400" size="3" variant="surface">
          <Table.Header>
            <Table.Row className="text-center" style={{ color: "var(--primary)" }}>
              <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Mode</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Stage</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {allocationHistory.length > 0 &&
              allocationHistory.map((allocation) => {
                return (
                  <Table.Row className="py-2 text-center" key={allocation.id}>
                    <Table.Cell> {allocation.connectedOn}</Table.Cell>
                    <Table.Cell>{allocation.mode}</Table.Cell>
                    <Table.Cell>{allocation.stage}</Table.Cell>
                    <Table.Cell>{allocation.status}</Table.Cell>
                  </Table.Row>
                )
              })}
          </Table.Body>
        </Table.Root>
      </div>
    </OneViewLayout>
  )
}
