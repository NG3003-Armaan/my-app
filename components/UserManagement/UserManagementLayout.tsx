import clsx from "clsx"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import * as React from "react"

import { Divider, Heading, Icon, Page, Stack } from "components"
import SeparatorLayout from "components/SeparatorLayout/SeparatorLayout"

const userManagementLinks = [
  {
    id: 1,
    links: [
      { href: "/user-management/ng-employee/add", title: "Add NG employee" },
      { href: "/user-management/ng-employee/manage", title: "Manage NG employee" },
    ],
  },
  {
    id: 2,
    links: [
      { href: "/user-management/agency/add", title: "Add Agency" },
      { href: "/user-management/agency/manage", title: "Manage Agency" },
    ],
  },
  {
    id: 3,
    links: [
      { href: "/user-management/agent/add", title: "Add Agent" },
      { href: "/user-management/agent/manage", title: "Manage Agent" },
    ],
  },
]

interface UserManagementProps {
  children: React.ReactNode | null
}

export function UserManagementLayout(props: UserManagementProps) {
  const router = useRouter()

  return (
    <Page>
      <Head>
        <title>User Management</title>
      </Head>
      <SeparatorLayout>
        <div className="w-1/6 min-w-[280px]">
          <div className="sticky top-3 py-3 ">
            <Stack direction="row" className="mb-5 items-center px-4 text-primary">
              <Icon name="grid" />
              <Heading as="h2" size="xl" variant="primary" className="underline">
                User Management
              </Heading>
            </Stack>

            <div className="mt-3">
              {userManagementLinks.map(({ id, links }) => {
                return (
                  <Stack spacing="sm" className="" key={id}>
                    {links.map((link) => {
                      const isActive = router.pathname === link.href

                      return (
                        <React.Fragment key={link.href}>
                          <Stack
                            spacing="sm"
                            direction="row"
                            className={clsx("items-center p-4", {
                              "bg-primary text-white": isActive,
                            })}
                            key={link.href}
                          >
                            <div
                              className={clsx("mr-2 rounded-lg p-0.5 text-sm ", {
                                "bg-white font-bold text-primary": isActive,
                                "bg-primary text-white": !isActive,
                              })}
                            >
                              <Icon name="plus" />
                            </div>
                            <Link href={link.href} key={link.href}>
                              {link.title}
                            </Link>
                          </Stack>
                          {<Divider className="my-1" />}
                        </React.Fragment>
                      )
                    })}
                  </Stack>
                )
              })}
            </div>
          </div>
        </div>

        <div className="flex-1 p-3">{props.children}</div>
      </SeparatorLayout>
    </Page>
  )
}
