import { Table } from "@radix-ui/themes"
import Head from "next/head"
import { useMemo, useState } from "react"
import { AllocationLayout, Heading, Modal, SelectInput } from "components"
import { AdvanceFilter } from "components/Allocation"
import { SelectInputDefaultValue } from "components/SelectInput/SelectInput"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { allocationActions, AllocationState } from "store/slices/allocation"
import { getAgentAllocation } from "store/slices/allocation/async-action"

export const agentNames = [
  { id: "1", title: "Paras Mistry", value: "NG2511" },
  { id: "2", title: "Suraj", value: "NG2512" },
  { id: "13", title: "Suraj Mohanty", value: "Suraj Mohanty" },
  { id: "3", title: "Dhana", value: "NG2513" },
  { id: "4", title: "Mutthu", value: "NG2514" },
  { id: "5", title: "Gokul", value: "NG2515" },
  { id: "6", title: "Sugan", value: "NG2516" },
  { id: "7", title: "Vipin", value: "NG2517" },
  { id: "8", title: "Naveen", value: "NG2518" },
  { id: "9", title: "Jay", value: "NG2519" },
  { id: "10", title: "Praveen", value: "NG2520" },
  { id: "11", title: "Manoj", value: "NG2521" },
  { id: "12", title: "Kumar", value: "NG2522" },
]

export default function UserManagement() {
  const dispatch = useAppDispatch()
  const [filterOpen, setFilterOpen] = useState(false)

  const { allocations, agentId } = useAppSelector<AllocationState>((state) => state.allocation)

  const { appId, allocationDate, dpd, priorityBucket, resolutionRate, propensity, criticality } = useAppSelector<
    AllocationState["advanceFilter"]
  >((state) => state.allocation.advanceFilter)

  let filteredAllocations = useMemo(() => {
    return appId !== "" ? allocations.filter((allocation) => allocation.appId.includes(appId)) : allocations
  }, [allocations, appId])

  filteredAllocations = useMemo(() => {
    return priorityBucket !== SelectInputDefaultValue
      ? filteredAllocations.filter((allocation) => allocation.priorityBucket === priorityBucket)
      : filteredAllocations
  }, [filteredAllocations, priorityBucket])

  const SelectAgentName = () => {
    return (
      <SelectInput
        title="Agent name"
        options={agentNames}
        value={agentId}
        onChange={(e) => {
          dispatch(allocationActions.setAgentName(e.target.value))
          dispatch(getAgentAllocation({ agentId: e.target.value }))
        }}
        className="text-primary"
      />
    )
  }

  return (
    <AllocationLayout>
      <Head>
        <title>Allocation</title>
      </Head>

      <div className="flex flex-row items-center justify-between">
        <Heading className="text-muted-gray underline">Allocation for the month August 2023</Heading>
        <SelectAgentName />
        <p
          className="text-primary underline"
          onClick={() => {
            setFilterOpen(!filterOpen)
          }}
        >
          Advanced Filter
        </p>
        <Modal isOpen={filterOpen} onOpenChange={() => setFilterOpen(!filterOpen)}>
          <AdvanceFilter
            handleClearFilter={() => {
              setFilterOpen(!filterOpen)
            }}
          />
        </Modal>
      </div>
      {/* <div className="flex items-center justify-end text-xs">
        {appId && <p> App Id :{appId} | </p>}
        {allocationDate && <p> Allocation Date :{allocationDate} <span>X</span> | </p>}
        {priorityBucket && <p> Priority Bucket :{priorityBucket} | </p>}
        {resolutionRate && <p> Resolution Rate :{resolutionRate} | </p>}
        {propensity && <p> Propensity :{propensity} | </p>}
        {criticality && <p>Criticality :{criticality} | </p>}
      </div> */}
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
            {filteredAllocations.length > 0 &&
              filteredAllocations.map((allocation) => {
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
        {agentId === SelectInputDefaultValue && <p className="py-2 text-center"> No Agent selected</p>}
        {agentId !== SelectInputDefaultValue &&
          (appId || allocationDate || dpd || priorityBucket || resolutionRate || propensity || criticality) &&
          filteredAllocations.length === 0 && <p className="py-2 text-center"> No results found with these filters</p>}
      </div>
    </AllocationLayout>
  )
}
