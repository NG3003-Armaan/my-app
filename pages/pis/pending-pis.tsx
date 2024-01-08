import { Table } from "@radix-ui/themes"
import React from "react"
import { Heading, Page, SelectInput, Stack } from "components"

import { useAppDispatch, useAppSelector } from "store/hooks"
import { pisActions, PisState } from "store/slices/pis"
import { getPendingPis } from "store/slices/pis/async-actions"

export const acknowledgementUsers = [
  { id: "2", title: "Dhana", value: "NG2513" },
  { id: "3", title: "Mutthu", value: "NG2514" },
]

export default function PendingPis() {
  const { acknowledgementUserId, pis } = useAppSelector<PisState>((state) => state.pis)

  const dispatch = useAppDispatch()

  const SelectAcknowledgementUser = () => {
    return (
      <SelectInput
        title="Acknowledgement User"
        options={acknowledgementUsers}
        value={acknowledgementUserId}
        onChange={(e) => {
          dispatch(pisActions.setName(e.target.value))
          dispatch(getPendingPis({ acknowledgementUserId: e.target.value }))
        }}
        className="text-primary"
      />
    )
  }

  return (
    <>
      <Page navLinks="pis">
        <Stack className="flex w-full flex-col">
          <Stack className="border-bottom flex w-full flex-row items-center justify-evenly border-b-2 pb-2">
            <Heading className="text-muted-gray underline">PIS for the month of August</Heading>
            <SelectAcknowledgementUser />
          </Stack>
          <Stack>
            <Table.Root className="ng-stickyTable bg-green-400" size="3" variant="surface">
              <Table.Header>
                <Table.Row className="text-center" style={{ color: "var(--primary)" }}>
                  <Table.ColumnHeaderCell>APP ID</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Business Name</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Receipt Date</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Receipt Amount</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Mode</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Agent Name</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Ack. User</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>TXN ID</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {pis.map((item) => {
                  return (
                    <Table.Row className="py-2 text-center" key={item.id}>
                      <Table.Cell>{item.appId}</Table.Cell>
                      <Table.Cell>{item.businessName}</Table.Cell>
                      <Table.Cell>{item.receiptDate}</Table.Cell>
                      <Table.Cell>{item.receiptAmount}</Table.Cell>
                      <Table.Cell>{item.mode}</Table.Cell>
                      <Table.Cell>{item.agentName}</Table.Cell>
                      <Table.Cell>{item.acknowledgementUser}</Table.Cell>
                      <Table.Cell>{item.transactionId}</Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table.Root>
          </Stack>
        </Stack>
      </Page>
    </>
  )
}
