import { Table } from "@radix-ui/themes"
import clsx from "clsx"
import _ from "lodash"
import Head from "next/head"
import * as React from "react"
import Select from "react-select"

import { Button, Heading, SelectInput, Stack, UserManagementLayout } from "components"
import { activityStatuses } from "data"
import { ActivityStatus } from "enums"
import { API } from "service"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { agentActions, AgentState } from "store/slices/user-management/agent"
import { updateAgentStatus } from "store/slices/user-management/agent/async-actions"
import { PageServerSideProps } from "types"

export default function AgentManage(props: PageServerSideProps<typeof getServerSideProps>) {
  const { searchedAgentDetail, searchQuery } = useAppSelector<AgentState>((state) => state.agent)

  const { agents } = props

  const dispatch = useAppDispatch()

  const agent = agents.find((a) => a.id === searchQuery?.value)

  React.useEffect(() => {
    if (agent) dispatch(agentActions.setSearchedAgentDetail(agent))
  }, [searchQuery])

  return (
    <UserManagementLayout>
      <Head>
        <title>Manage | Ng Employee</title>
      </Head>
      <div>
        <div className="flex items-center justify-between">
          <Heading>Manage NG Employee</Heading>
          <div>
            <Select
              instanceId="long-value-select"
              options={agents.map((agent) => ({ value: agent.id, label: agent.agentName }))}
              onChange={(e) => dispatch(agentActions.setSearchQuery(e as { value: number; label: string }))}
              value={searchQuery}
              isClearable
              className="react-select-container w-full"
              placeholder="Search Agency Name"
              classNames={{
                control: ({ isFocused }) =>
                  clsx("!shadow-none p-1 !rounded-md", {
                    "!border-primary !border-2": isFocused,
                  }),
                option: ({ isFocused }) =>
                  clsx("", {
                    "!bg-primary !text-white": isFocused,
                  }),
              }}
            />
          </div>
        </div>
        <Table.Root className="table-full mt-6 table-fixed bg-green-400" size="3" variant="surface">
          <Table.Header>
            <Table.Row className="text-center" style={{ color: "var(--primary)" }}>
              <Table.ColumnHeaderCell>Agent Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Agency Code</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Renew Contract</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Activity Status</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {searchQuery && searchedAgentDetail ? (
              <Table.Row className="text-center">
                <Table.Cell>{searchedAgentDetail?.agentName}</Table.Cell>
                <Table.Cell>{searchedAgentDetail?.agencyCode}</Table.Cell>
                <Table.Cell>{searchedAgentDetail?.renewalContract}</Table.Cell>
                <Table.Cell>
                  <SelectInput
                    options={activityStatuses}
                    value={searchedAgentDetail.status}
                    title="Select Activity Status"
                    onChange={(e) =>
                      dispatch(
                        agentActions.setSearchedAgentDetailStatus({
                          activityStatus: e.target.value as ActivityStatus,
                        })
                      )
                    }
                  />
                </Table.Cell>
              </Table.Row>
            ) : (
              <Table.Row className="relative p-3">
                <Table.Cell>
                  <p className="absolute inset-0 p-3 text-center">Search result found here.</p>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>

        <Stack direction="row" className="mx-auto mt-8 w-fit">
          <Button
            onClick={() => {
              dispatch(updateAgentStatus({ changedAgentStatus: agent?.status !== searchedAgentDetail?.status }))
            }}
          >
            Submit
          </Button>
          <Button variant="secondary" onClick={() => dispatch(agentActions.resetSearchResult())}>
            Cancel
          </Button>
        </Stack>
      </div>
    </UserManagementLayout>
  )
}

export const getServerSideProps = async () => {
  try {
    const { data: agents } = await API.getAgents()

    return {
      props: {
        agents,
      },
    }
  } catch (e) {
    return { props: { agents: [] } }
  }
}
