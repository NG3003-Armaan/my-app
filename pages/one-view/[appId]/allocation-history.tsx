import { Table } from "@radix-ui/themes"
import DateRange from "components/DateRange/DateRange"
import OneViewLayout from "components/OneView/OneViewLayout"
import { API } from "service"
import { PageServerSideProps } from "types"

export default function AllocationHistory(props: PageServerSideProps<typeof getServerSideProps>) {
  const { allocationHistory } = props

  return (
    <OneViewLayout>
      <div>
        <DateRange />
        <Table.Root className="ng-stickyTable mt-6 bg-green-400" size="3" variant="surface">
          <Table.Header>
            <Table.Row className="text-center" style={{ color: "var(--primary)" }}>
              <Table.ColumnHeaderCell>Allocation Date</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Expiry date</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Agent Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Agent Type</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {allocationHistory.length > 0 &&
              allocationHistory.map((allocation, indx) => {
                return (
                  <Table.Row className="py-2 text-center" key={indx}>
                    <Table.Cell> {allocation.allocationDate}</Table.Cell>
                    <Table.Cell>{allocation.expiryDate}</Table.Cell>
                    <Table.Cell>{allocation.agentName}</Table.Cell>
                    <Table.Cell>{allocation.agentType}</Table.Cell>
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
      data: { allocationHistory },
    } = await API.fetchAllocationHistory(2)

    return {
      props: {
        allocationHistory,
      },
    }
  } catch (error) {
    return {
      props: {
        allocationHistory: [],
      },
    }
  }
}
