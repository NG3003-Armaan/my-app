import { Table } from "@radix-ui/themes"
import { ProgressBar } from "components"
import { PriorityBucket } from "enums"
import { Heading, Wrapper } from "./shared"

interface ResolutionProps {
  resolutions: Array<{
    id: string
    priority: PriorityBucket
    allocatedCases: number
    pBal: string
    resolution: number
    resolutionValue: number
  }>
  resolutionRate: number // TODO - we'll calculate this later
}

export default function Resolution(props: ResolutionProps) {
  return (
    <Wrapper>
      <Heading>Resolution</Heading>
      <div>
        <Table.Root className="table-full mt-6 table-fixed bg-green-400" size="3" variant="surface">
          <Table.Header>
            <Table.Row className="text-center" style={{ color: "var(--primary)" }}>
              <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Allocated</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>PBAL</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Res%</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Res V</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {props.resolutions.map((resolution) => {
              return (
                <Table.Row className="text-center" key={resolution.id}>
                  <Table.Cell className="font-bold">{resolution.priority}</Table.Cell>
                  <Table.Cell>{resolution.allocatedCases}</Table.Cell>
                  <Table.Cell>{resolution.pBal}</Table.Cell>
                  <Table.Cell>{resolution.resolution}%</Table.Cell>
                  <Table.Cell>{resolution.resolutionValue}</Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table.Root>
      </div>
      <div className="mt-6">
        <Heading>Resolution Rate</Heading>
        <ProgressBar progress={10} />
      </div>
    </Wrapper>
  )
}
