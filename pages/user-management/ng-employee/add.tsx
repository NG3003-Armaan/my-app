import { Table } from "@radix-ui/themes"

import Head from "next/head"
import * as React from "react"

import Select from "react-select"
import { twMerge } from "tailwind-merge"
import { Button, Stack, UserManagementLayout } from "components"
import { API } from "service"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { ngEmployeeActions, NgEmployeeState } from "store/slices/user-management/ng-employee"
import { createNgEmployee } from "store/slices/user-management/ng-employee/async-actions"
import { PageServerSideProps } from "types"

export default function NgEmployeeAdd(props: PageServerSideProps<typeof getServerSideProps>) {
  const dispatch = useAppDispatch()

  const { employees: users } = props

  const { employees, updatedEmployeeRoles } = useAppSelector<NgEmployeeState>((state) => state.ngEmployee)

  React.useEffect(() => {
    dispatch(ngEmployeeActions.setEmployees(users))
    dispatch(
      ngEmployeeActions.setUpdateEmployeesRoles(
        users.map((user) => ({
          employeeId: user.id,
          roles: user.roles.map((r) => ({
            id: r.id,
            label: r.name,
            value: r.id,
            status: "initial",
          })),
        }))
      )
    )
  }, [])

  return (
    <UserManagementLayout>
      <Head>
        <title>Add | Ng Employee</title>
      </Head>
      <div className="px-3">
        <Table.Root className="table-full table-fixed" size="3" variant="surface">
          <Table.Header>
            <Table.Row className={twMerge("text-center text-lg text-primary")} style={{ color: "var(--primary)" }}>
              <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Department</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>HR designation</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {employees.map((employee) => {
              const updatedRole = updatedEmployeeRoles.find((e) => e.employeeId === employee.id)

              return (
                <Table.Row key={employee.id}>
                  <Table.Cell>{employee.name}</Table.Cell>
                  <Table.Cell>{employee.department}</Table.Cell>
                  <Table.Cell>{employee.hrDesignation}</Table.Cell>
                  <Table.RowHeaderCell>
                    <div className="relative">
                      <Select
                        isMulti
                        value={updatedRole?.roles}
                        onChange={() => {
                          // dispatch(
                          //   ngEmployeeActions.setUpdateEmployeeRole({
                          //     employeeId: employee.id,
                          //     roles: e as Array<s>,
                          //   })
                          // )
                        }}
                        // options={roleGroups.map((rg) => ({ label: rg.name, value: rg.id, id: rg.id }))}
                      />
                    </div>
                  </Table.RowHeaderCell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table.Root>

        <Stack direction="row" className="mx-auto mt-8 w-fit">
          <Button
            onClick={() => {
              dispatch(createNgEmployee())
            }}
          >
            Submit
          </Button>
          <Button variant="secondary">Cancel</Button>
        </Stack>
      </div>
    </UserManagementLayout>
  )
}

export const getServerSideProps = async () => {
  try {
    const { data: employees = [] } = await API.getNgEmployees()
    const { data: roleGroups = [] } = await API.getRoleGroups()

    return { props: { employees, roleGroups } }
  } catch (error) {
    return { props: { employees: [], roleGroups: [] } }
  }
}
