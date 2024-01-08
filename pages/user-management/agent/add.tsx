import Head from "next/head"
import * as React from "react"
import { Button, Divider, Heading, Stack, UserManagementLayout } from "components"
import AddAgentForm from "components/UserManagement/Agent/AddAgentForm"
import { API } from "service"
import { useAppDispatch } from "store/hooks"
import { agentActions } from "store/slices/user-management/agent"
import { createAgent } from "store/slices/user-management/agent/async-actions"
import { PageServerSideProps } from "types"

export default function AddAgent(props: PageServerSideProps<typeof getServerSideProps>) {
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(agentActions.setEmployees(props.employees.map((e) => ({ id: e.id, value: e.id, title: e.name }))))
    dispatch(agentActions.setAgencyNames(props.agencies.map((e) => ({ id: e.id, value: e.id, title: e.agencyName }))))
  }, [])

  return (
    <UserManagementLayout>
      <Head>
        <title>Add | Agent</title>
      </Head>
      <div className="mx-auto max-w-4xl">
        <Heading>Add Agent</Heading>
        <Divider className="mb-8" />
        <p className="my-3">Enter agent details below:</p>

        <AddAgentForm />
        <Stack direction="row" className="mx-auto mt-8 w-fit">
          <Button
            onClick={() => {
              dispatch(createAgent())
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
    const { data: employees } = await API.getNgEmployees()
    const { data: agencies = [] } = await API.getAgencies()

    return { props: { agencies, employees } }
  } catch (err) {
    return {
      props: {
        employees: [],
        agencies: [],
      },
    }
  }
}
