import { Table } from "@radix-ui/themes"
import React from "react"

import { Button, Heading, ImageIcon, Stack } from "components"
import { LitigationLayout } from "components/Litigation"
import { API } from "service"
import { PageServerSideProps } from "types"

export default function LegalStaus(props: PageServerSideProps<typeof getServerSideProps>) {
  const { legalStatus } = props
  return (
    <LitigationLayout screen="Legal-status" iconName="status" title="Status">
      <Stack className="flex w-full flex-col">
        <div className="flex flex-row justify-between">
          <Heading className="text-muted-gray underline">Current Status of Litigation cases:</Heading>
          <span className="flex">
            <Button variant={"link"} className="text-md justify-items-end px-2 text-blue-500 underline">
              Download status file
            </Button>
            <ImageIcon name="download" className="m-auto mb-2 w-8 px-1" />
          </span>
        </div>
        <div>
          <Table.Root className="ng-stickyTable bg-green-400" size="3" variant="surface">
            <Table.Header>
              <Table.Row className="text-center" style={{ color: "var(--primary)" }}>
                <Table.ColumnHeaderCell>App ID</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Business Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Location</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>DPD</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>PBal</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Loan Amount</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body className="text-center">
              {legalStatus.length > 0 &&
                legalStatus.map((data) => {
                  return (
                    <Table.Row key={data.appId}>
                      <Table.Cell>{data.appId}</Table.Cell>
                      <Table.Cell>{data.name}</Table.Cell>
                      <Table.Cell>{data.location}</Table.Cell>
                      <Table.Cell>{data.dpd}</Table.Cell>
                      <Table.Cell>{data.pbal}</Table.Cell>
                      <Table.Cell>{data.loan}</Table.Cell>
                      <Table.Cell>{data.status}</Table.Cell>
                    </Table.Row>
                  )
                })}
            </Table.Body>
          </Table.Root>
        </div>
      </Stack>
    </LitigationLayout>
  )
}

export async function getServerSideProps() {
  try {
    const {
      data: { legalStatus },
    } = await API.pullLegalStatus()

    return {
      props: {
        legalStatus,
      },
    }
  } catch (err) {
    return {
      props: {
        legalStatus: [],
      },
    }
  }
}
