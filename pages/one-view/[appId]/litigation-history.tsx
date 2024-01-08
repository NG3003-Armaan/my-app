import { Table, TextArea } from "@radix-ui/themes"
import { Heading } from "components"
import OneViewLayout from "components/OneView/OneViewLayout"

const litigationHistory = [
  {
    id: "1",
    document: "Sec. 138 cheques",
    status: "In-Transit",
    date: "16/06/2023",
    pbal: "13,50,000",
  },
  {
    id: "2",
    document: "Sec. 138 cheques",
    status: "In-Transit",
    date: "16/06/2023",
    pbal: "13,50,000",
  },
  {
    id: "3",
    document: "Sec. 138 cheques",
    status: "In-Transit",
    date: "16/06/2023",
    pbal: "13,50,000",
  },
  { id: "4", document: "Sec. 138 cheques", status: "In-Transit", date: "16/06/2023", pbal: "13,50,000" },
]

export default function Litigation() {
  return (
    <OneViewLayout>
      <div className="mb-12">
        <div className="flex flex-row items-center justify-between">
          <Heading className="border bg-gray-200 p-2" size={"md"}>
            Connect History
          </Heading>
        </div>
        <Table.Root className="ng-stickyTable mt-6 bg-green-400" size="3" variant="surface">
          <Table.Header>
            <Table.Row className="text-center" style={{ color: "var(--primary)" }}>
              <Table.ColumnHeaderCell>Document</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>PBAL</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {litigationHistory.length > 0 &&
              litigationHistory.map((litigation) => {
                return (
                  <Table.Row className="py-2 text-center" key={litigation.id}>
                    <Table.Cell> {litigation.document}</Table.Cell>
                    <Table.Cell>{litigation.status}</Table.Cell>
                    <Table.Cell>{litigation.date}</Table.Cell>
                    <Table.Cell>{litigation.pbal}</Table.Cell>
                  </Table.Row>
                )
              })}
          </Table.Body>
        </Table.Root>
      </div>
      <div className="mb-12">
        <div className="flex flex-row items-center justify-between">
          <Heading className="border bg-gray-200 p-2" size={"md"}>
            Case Status
          </Heading>
        </div>
        <TextArea className="mt-6" disabled></TextArea>
      </div>
      <div className="mb-12">
        <div className="flex flex-row items-center justify-between">
          <Heading className="border bg-gray-200 p-2" size={"md"}>
            View More
          </Heading>
        </div>
      </div>
      <div className="mb-12">
        <div className="flex flex-row items-center justify-between">
          <Heading className="border bg-gray-200 p-2" size={"md"}>
            Filing History
          </Heading>
        </div>
      </div>
    </OneViewLayout>
  )
}
