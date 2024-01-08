import { Heading, Table } from "@radix-ui/themes"
import React from "react"
import { Button, Icon } from "components"

import PisLayout from "components/Pis/PisLayout"

export default function Reconciliation() {
  return (
    <PisLayout>
      <div className="flex flex-row items-center justify-between">
        <Heading className="text-muted-gray underline">
          Click on trigger bank statement to download latest bank statement
        </Heading>
      </div>
      <div className="mt-5 ">
        <Table.Root className="ng-stickyTable mt-6 bg-green-400" size="3" variant="surface">
          <Table.Header>
            <Table.Row className="text-center" style={{ color: "var(--primary)" }}>
              <Table.ColumnHeaderCell>Bank Statement</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Trigger Date and Time</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>User</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Download</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row className="py-2 text-center">
              <Table.Cell>Bank Statement 1</Table.Cell>
              <Table.Cell>31/08/2023 07:55 PM</Table.Cell>
              <Table.Cell>Abhijeet</Table.Cell>
              <Table.Cell className="flex justify-center">
                <Icon name="download" />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
        <Button className="mt-6">Trigger Bank Statement</Button>
      </div>
    </PisLayout>
  )
}
