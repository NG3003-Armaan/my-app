import { Heading, Table } from "@radix-ui/themes"
import React from "react"
import { Button } from "components"
import PisLayout from "components/Pis/PisLayout"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { PisState } from "store/slices/pis"
import { getAcknowledgedPis } from "store/slices/pis/async-actions"

export default function AcknowledgePis() {
  const { acknowledgedPis } = useAppSelector<PisState>((state) => state.pis)

  const dispatch = useAppDispatch()

  return (
    <PisLayout>
      <div className="flex flex-row items-center justify-between">
        <Heading className="text-muted-gray underline">
          Click on generate output to reconcile acknowledged receipts:
        </Heading>
      </div>
      <div className="mt-5 ">
        <Table.Root className="ng-stickyTable mt-6 bg-green-400" size="3" variant="surface">
          <Table.Header>
            <Table.Row className="text-center" style={{ color: "var(--primary)" }}>
              <Table.ColumnHeaderCell>APP ID</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Receipt Date</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Receipt Amount</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>TXN ID</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Ack. Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {acknowledgedPis.map((output) => {
              return (
                <Table.Row key={output.id} className="py-2 text-center">
                  <Table.Cell>{output.applicationId}</Table.Cell>
                  <Table.Cell>{output.date}</Table.Cell>
                  <Table.Cell>{output.amount}</Table.Cell>
                  <Table.Cell>{output.transactionId}</Table.Cell>
                  <Table.Cell>{output.acknowledgedUser} </Table.Cell>
                  <Table.Cell>{output.status}</Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table.Root>
        <Button
          className="mt-6"
          onClick={() => {
            dispatch(getAcknowledgedPis())
          }}
        >
          Generate Output
        </Button>
      </div>
    </PisLayout>
  )
}
