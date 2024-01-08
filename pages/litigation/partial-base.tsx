import { Table } from "@radix-ui/themes"
import React from "react"

import { Button, Heading, ImageIcon, SelectInput, SeparatorLayout, Stack } from "components"
import { LitigationLayout } from "components/Litigation"
import { API } from "service"
import { PageServerSideProps } from "types"

export default function PartialBase(props: PageServerSideProps<typeof getServerSideProps>) {
  const { partialBase, caseActions } = props

  return (
    <LitigationLayout iconName="approved-base" title="Partial Base" screen="Legal">
      <SeparatorLayout>
        <Stack className="flex w-full flex-col">
          <div className="flex flex-row items-center justify-between">
            <Heading className="text-muted-gray underline">Partial Approved cases for legal action:</Heading>
            <span className="flex">
              <Button variant={"link"} className="text-md justify-items-end px-2 text-blue-400 underline">
                Download Partial approved base
              </Button>
              <ImageIcon name="download" className="m-auto mb-2 w-8 px-1"></ImageIcon>
            </span>
          </div>
          <div className="mt-5">
            <Table.Root className="ng-stickyTable bg-green-400" size="3" variant="surface">
              <Table.Header>
                <Table.Row className="text-center" style={{ color: "var(--primary)" }}>
                  <Table.ColumnHeaderCell>App Id</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Business Name </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Location</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>DPD</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>PBal</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Loan Amount</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Remarks</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {partialBase.length > 0 &&
                  partialBase.map((data, index) => {
                    return (
                      <Table.Row className="py-2 text-center" key={index}>
                        <Table.Cell>{data.appId}</Table.Cell>
                        <Table.Cell>{data.name}</Table.Cell>
                        <Table.Cell>{data.location}</Table.Cell>
                        <Table.Cell>{data.dpd}</Table.Cell>
                        <Table.Cell>{data.pbal}</Table.Cell>
                        <Table.Cell>{data.loanAmount}</Table.Cell>
                        <Table.Cell>{data.remarks}</Table.Cell>
                        <Table.Cell>
                          <div>
                            <SelectInput
                              title="Select"
                              defaultValue={data.activity}
                              options={caseActions}
                            ></SelectInput>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
              </Table.Body>
            </Table.Root>
          </div>
        </Stack>
      </SeparatorLayout>
    </LitigationLayout>
  )
}

export async function getServerSideProps() {
  try {
    const {
      data: { partialBase, caseActions },
    } = await API.pullPartialBase()

    return {
      props: {
        partialBase,
        caseActions,
      },
    }
  } catch (error) {
    return {
      props: {
        partialBase: [],
        caseActions: [],
      },
    }
  }
}
