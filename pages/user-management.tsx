import Head from "next/head"

import { UserManagementLayout } from "components"

export default function UserManagement() {
  return (
    <UserManagementLayout>
      <Head>
        <title>User Management</title>
      </Head>
    </UserManagementLayout>
  )
}
