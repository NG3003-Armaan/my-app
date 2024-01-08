import { Table } from "@radix-ui/themes"
import Head from "next/head"
import { Divider, Heading, ImageIcon, Page, SelectInput, SeparatorLayout } from "components"
import { SelectInputDefaultValue } from "components/SelectInput/SelectInput"
import { useAppSelector } from "store/hooks"
import { AllocationState } from "store/slices/allocation"
import { agentNames } from "./allocation"

export default function MyAccounts() {
  const { allocations, agentId } = useAppSelector<AllocationState>((state) => state.allocation)
  return (
    <Page>
      <Head>
        <title>My Accounts</title>
      </Head>
      <SeparatorLayout>
        <div className="relative w-1/6 min-w-[320px]">
          <div className="sticky top-3 py-3 text-center">
            <ImageIcon name="my-accounts" className="m-auto mb-2 w-10" />
            <Heading as="h4" size="md" className="font-semibold text-primary underline">
              My Accounts
            </Heading>
            <Divider />
          </div>
        </div>
        <div className="flex-1 p-3">
          <div className="flex flex-row items-center justify-between">
            <Heading className="text-muted-gray underline">My accounts for the month August 2023</Heading>
          </div>
          <div className="mt-5 ">
            <Heading className="mb-3">Paras Mistry | NG2511 | Mumbai</Heading>
            <Table.Root className="ng-stickyTable mt-6 bg-green-400" size="3" variant="surface">
              <Table.Header>
                <Table.Row className="text-center" style={{ color: "var(--primary)" }}>
                  <Table.ColumnHeaderCell>APP ID</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Allocation Date</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Business Name</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>DPD</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Priority Bucket</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Reallocation</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {allocations.length > 0 &&
                  allocations.map((allocation) => {
                    return (
                      <Table.Row className="py-2 text-center" key={allocation.id}>
                        <Table.Cell>{allocation.appId}</Table.Cell>
                        <Table.Cell> {allocation.allocationDate}</Table.Cell>
                        <Table.Cell>{allocation.businessName}</Table.Cell>
                        <Table.Cell>{allocation.dpd}</Table.Cell>
                        <Table.Cell>{allocation.priorityBucket}</Table.Cell>

                        <Table.Cell>
                          <SelectInput
                            options={agentNames.filter(({ value }) => value !== agentId)}
                            value={SelectInputDefaultValue}
                            title="Select Agent"
                            onChange={() => alert("Successfully Reallocated")}
                            className="rounded-lg border-2 bg-light-gray"
                          />
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
              </Table.Body>
            </Table.Root>
            {allocations.length === 0 && <p className="py-2 text-center"> No Accounts found</p>}
          </div>
        </div>
      </SeparatorLayout>
    </Page>
  )
}
