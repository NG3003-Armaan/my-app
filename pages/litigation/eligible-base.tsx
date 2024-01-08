import { Heading, Table, Text } from "@radix-ui/themes"
import React from "react"

import { ImageIcon, SeparatorLayout, Stack } from "components"
import LitigationLayout from "components/Litigation/LitigationLayout"
import { API } from "service"
import { PageServerSideProps } from "types"

export default function EligibleBase(props: PageServerSideProps<typeof getServerSideProps>) {
  const { eligibleBase } = props

  return (
    <LitigationLayout iconName="eligible-base" title="Eligible Base" screen="">
      <SeparatorLayout>
        <Stack className="flex w-full flex-col">
          <div className="flex flex-row items-center justify-between">
            <Heading className="text-md mr-2 px-5 font-light text-muted-gray underline">
              Current Eligible base for litigation
            </Heading>
            <span className="flex">
              <Text className="justify-items-end px-2 text-blue-500 underline">Download Eligible Base File</Text>
              <ImageIcon name="download" className="m-auto mb-2 w-8 px-1" />
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
                  <Table.ColumnHeaderCell>History</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {eligibleBase.length > 0 &&
                  eligibleBase.map((data) => {
                    return (
                      <Table.Row className="py-2 text-center" key={data.appId}>
                        <Table.Cell>{data.appId}</Table.Cell>
                        <Table.Cell>{data.name}</Table.Cell>
                        <Table.Cell>{data.location}</Table.Cell>
                        <Table.Cell>{data.dpd}</Table.Cell>
                        <Table.Cell>{data.pbal}</Table.Cell>
                        <Table.Cell>{data.loanAmount}</Table.Cell>
                        <Table.Cell>{data.history}</Table.Cell>
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
      data: { eligibleBase },
    } = await API.pullEligibleBase()

    return {
      props: {
        eligibleBase,
      },
    }
  } catch (error) {
    return {
      props: {
        eligibleBase: [],
      },
    }
  }
}
