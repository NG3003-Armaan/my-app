import { Table } from "@radix-ui/themes"
import DateRange from "components/DateRange/DateRange"
import OneViewLayout from "components/OneView/OneViewLayout"
import { API } from "service"
import { PageServerSideProps } from "types"

export default function TrailHistory(props: PageServerSideProps<typeof getServerSideProps>) {
  const { trailHistory } = props

  return (
    <OneViewLayout>
      <div>
        <DateRange />
        <Table.Root className="ng-stickyTable mt-6 bg-green-400" size="3" variant="surface">
          <Table.Header>
            <Table.Row className="text-center" style={{ color: "var(--primary)" }}>
              <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Type of Vist</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Disposit Code</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Agent Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Remarks</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {trailHistory &&
              trailHistory.length > 0 &&
              trailHistory.map((trail, index) => {
                return (
                  <Table.Row className="py-2 text-center" key={index}>
                    <Table.Cell> {trail.date}</Table.Cell>
                    <Table.Cell>{trail.vistType}</Table.Cell>
                    <Table.Cell>{trail.dispositionCode}</Table.Cell>
                    <Table.Cell>{trail.agentName}</Table.Cell>
                    <Table.Cell>{trail.remarks}</Table.Cell>
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
      data: { trailHistory },
    } = await API.fetchTrailHistory(1)

    return {
      props: {
        trailHistory,
      },
    }
  } catch (error) {
    return {
      props: {
        trailHistory: [],
      },
    }
  }
}
