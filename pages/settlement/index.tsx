import { Table } from "@radix-ui/themes"
import Head from "next/head"
import Link from "next/link"
import { Divider, Heading, ImageIcon, Page, SelectInput, SeparatorLayout } from "components"
import { agentNames } from "pages/allocation"
import { API } from "service"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { settlementActions, SettlementState } from "store/slices/settlement"
import { PageServerSideProps } from "types"

export default function Settlement(props: PageServerSideProps<typeof getServerSideProps>) {
  const dispatch = useAppDispatch()

  const { settlements } = props

  const { agentName } = useAppSelector<SettlementState>((state) => state.settlement)

  const filteredSettlements = agentName ? settlements.filter((s) => s.agentName === agentName) : settlements

  return (
    <Page>
      <Head>
        <title>Settlement</title>
      </Head>
      <SeparatorLayout>
        <div className="relative w-1/6 min-w-[320px]">
          <div className="sticky top-3 py-3 text-center">
            <ImageIcon name="settlement" className="m-auto mb-2 w-10" />
            <Heading as="h4" size="md" className="font-semibold text-primary underline">
              Settlement
            </Heading>
            <Divider />
          </div>
        </div>
        <div className="flex-1 p-3">
          <div className="flex flex-row items-center justify-between">
            <Heading className="text-muted-gray underline">Allocation for the month August 2023</Heading>
            <SelectInput
              title="Agent name"
              options={agentNames}
              value={agentName}
              onChange={(e) => {
                dispatch(settlementActions.setAgentName(e.target.value))
              }}
              className="text-primary"
            />
          </div>
          <div className="mt-5 ">
            <Heading className="mb-3">Paras Mistry | NG2511 | Mumbai</Heading>
            <Table.Root className="ng-stickyTable mt-6 bg-green-400" size="3" variant="surface">
              <Table.Header>
                <Table.Row className="text-center" style={{ color: "var(--primary)" }}>
                  <Table.ColumnHeaderCell>APP ID</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Business Name</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>DPD</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Settlement date</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Agent Name</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Cust. Remark</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>As Remarks</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {filteredSettlements.length > 0 &&
                  filteredSettlements.map((settlement) => {
                    return (
                      <Table.Row className="py-2 text-center" key={settlement.id}>
                        <Table.Cell>
                          <Link href={`/settlement/${settlement.appId}`} className="text-primary underline">
                            {settlement.appId}
                          </Link>
                        </Table.Cell>
                        <Table.Cell>{settlement.businessName}</Table.Cell>
                        <Table.Cell>{settlement.dpd}</Table.Cell>
                        <Table.Cell>{settlement.settlementDate}</Table.Cell>

                        <Table.Cell>{settlement.agentName}</Table.Cell>
                        <Table.Cell> {settlement.customerRemarks}</Table.Cell>
                        <Table.Cell>{settlement.asStatus}</Table.Cell>
                      </Table.Row>
                    )
                  })}
              </Table.Body>
            </Table.Root>
            {filteredSettlements.length === 0 && <p className="py-2 text-center"> No Accounts found</p>}
          </div>
        </div>
      </SeparatorLayout>
    </Page>
  )
}

export async function getServerSideProps() {
  try {
    const { data: settlements } = await API.getSettlements()
    return {
      props: {
        settlements,
      },
    }
  } catch (err) {
    return {
      props: {
        settlements: [],
      },
    }
  }
}
