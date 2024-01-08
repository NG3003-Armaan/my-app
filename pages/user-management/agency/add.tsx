import Head from "next/head"
import * as React from "react"

import { Button, Divider, Heading, Stack, UserManagementLayout } from "components"
import { AddAgencyForm } from "components/UserManagement/Agency"
import { API } from "service"
import { useAppDispatch } from "store/hooks"
import { agencyAction } from "store/slices/user-management/agency"
import { createAgency } from "store/slices/user-management/agency/async-actions"
import { PageServerSideProps } from "types"

export default function AddAgencyPage(props: PageServerSideProps<typeof getServerSideProps>) {
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(agencyAction.setAgencyTypes(props.agencyTypes))
    dispatch(
      agencyAction.setReportingManagers(
        props.employees.map((e) => ({
          id: e.id,
          title: e.name,
          value: e.id,
        }))
      )
    )
  }, [])

  return (
    <UserManagementLayout>
      <Head>
        <title>Add | Agency</title>
      </Head>
      <div className="mx-auto max-w-4xl">
        <Heading>Add Agency</Heading>
        <Divider className="mb-8" />
        <p className="my-3">Enter agency details below:</p>

        <AddAgencyForm />
        <Stack direction="row" className="mx-auto mt-8 w-fit">
          <Button onClick={() => dispatch(createAgency())}>Submit</Button>
          <Button variant="secondary">Cancel</Button>
        </Stack>
      </div>
    </UserManagementLayout>
  )
}

export const getServerSideProps = async () => {
  try {
    const { data: employees } = await API.getNgEmployees()
    const { data: agencyTypes = [] } = await API.getAgencyTypes()

    return { props: { employees, agencyTypes } }
  } catch (err) {
    return {
      props: {
        employees: [],
        agencyTypes: [],
      },
    }
  }
}
