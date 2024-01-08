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
import { ngEmployeeActions, NgEmployeeState } from "store/slices/user-management/ng-employee"
import { updateNgEmployeeStatus } from "store/slices/user-management/ng-employee/async-actions"
import { PageServerSideProps } from "types"

export default function NgEmployeeManage(props: PageServerSideProps<typeof getServerSideProps>) {
  const { searchedEmployeeDetail, searchQuery } = useAppSelector<NgEmployeeState>((state) => state.ngEmployee)

  const { employees } = props

  const dispatch = useAppDispatch()

  const employee = employees.find((e) => e.id === searchQuery?.value)

  React.useEffect(() => {
    if (employee) dispatch(ngEmployeeActions.setSearchedEmployeeDetail(employee))
  }, [searchQuery])

  console.log("searchedEmployeeDetail", searchedEmployeeDetail)

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
              options={employees.map((employee) => ({ value: employee.id, label: employee.name }))}
              onChange={(e) => {
                console.log("e", e)
                dispatch(ngEmployeeActions.setSearchQuery(e as { value: number; label: string }))
              }}
              value={searchQuery}
              isClearable
              className="react-select-container w-full"
              placeholder="Search by Employee ID, Name, Mobile Number, Email id"
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
              <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Department</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Activity Status</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {searchQuery && searchedEmployeeDetail ? (
              <Table.Row className="text-center">
                <Table.Cell>{searchedEmployeeDetail?.name}</Table.Cell>
                <Table.Cell>{searchedEmployeeDetail?.department}</Table.Cell>
                {/* TODO */}
                {/* <Table.Cell>{searchedEmployeeDetail?.roles}</Table.Cell> */}
                <Table.Cell>-</Table.Cell>
                <Table.Cell>
                  <SelectInput
                    options={activityStatuses}
                    value={searchedEmployeeDetail.status}
                    title="Select Activity Status"
                    onChange={(e) =>
                      dispatch(
                        ngEmployeeActions.setSearchedEmployeeDetailStatus({
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
              dispatch(
                updateNgEmployeeStatus({ changedAgentStatus: employee?.status !== searchedEmployeeDetail?.status })
              )
            }}
          >
            Submit
          </Button>
          <Button variant="secondary" onClick={() => dispatch(ngEmployeeActions.resetSearchResult())}>
            Cancel
          </Button>
        </Stack>
      </div>
    </UserManagementLayout>
  )
}

export const getServerSideProps = async () => {
  try {
    const { data: employees } = await API.getNgEmployees()

    return {
      props: {
        employees,
      },
    }
  } catch (e) {
    return { props: { employees: [] } }
  }
}
