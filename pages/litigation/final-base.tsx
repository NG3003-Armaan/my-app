import { Heading, Table } from "@radix-ui/themes"
import React from "react"

import { Button, ImageIcon, SelectInput, SeparatorLayout, Stack } from "components"
import LitigationLayout from "components/Litigation/LitigationLayout"
import { API } from "service"
import { PageServerSideProps } from "types"

export default function FinalBase(props: PageServerSideProps<typeof getServerSideProps>) {
  const { finalBase } = props

  return (
    <LitigationLayout iconName="approved-base" title="Approved Base" screen="">
      <SeparatorLayout>
        <Stack className="flex w-full flex-col">
          <div className="flex flex-row items-center justify-between">
            <Heading className="text-muted-gray underline">Approved Cases for Legal Action:</Heading>
            <span className="flex">
              <Button variant={"link"} className="text-md justify-items-end px-2 text-blue-500 underline">
                Download approved base
              </Button>
              <ImageIcon name="download" className="m-auto mb-2 w-8 px-1" />
            </span>
          </div>
          <div className="mt-5">
            <Table.Root className="ng-stickyTable bg-green-400" size="3" variant="surface">
              <Table.Header>
                <Table.Row className="text-center" style={{ color: "var(--primary)" }}>
                  <Table.ColumnHeaderCell>App Id</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Business Name</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Location</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>DPD</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>PBal</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Loan Amount</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {finalBase.map((data, index) => {
                  return (
                    <Table.Row className="py-2 text-center" key={index}>
                      <Table.Cell>{data.appId}</Table.Cell>
                      <Table.Cell>{data.name}</Table.Cell>
                      <Table.Cell>Hyderabad</Table.Cell>
                      <Table.Cell>{data.dpd}</Table.Cell>
                      <Table.Cell>{data.pbal}</Table.Cell>
                      <Table.Cell>15L</Table.Cell>
                      <Table.Cell>
                        <div className="relative space-y-2">
                          <SelectInput
                            title="select"
                            defaultValue={data.activity}
                            options={props.caseActions}
                          ></SelectInput>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table.Root>
          </div>
          <div className="flex flex-row justify-center gap-3">
            <Button className="rounded-3xl">Submit</Button>
            <Button className="rounded-3xl bg-transparent text-black" variant="secondary">
              Cancel
            </Button>
          </div>
        </Stack>
      </SeparatorLayout>
    </LitigationLayout>
  )
}

export async function getServerSideProps() {
  try {
    const {
      data: { finalBase, caseActions },
    } = await API.pullFinalBase()

    return {
      props: {
        finalBase,
        caseActions,
      },
    }
  } catch (err) {
    return {
      props: {
        finalBase: [],
        caseActions: [],
      },
    }
  }
}
