import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import Divider from "components/Divider/Divider"
import Heading from "components/Heading/Heading"
import Page from "components/Page/Page"
import SeparatorLayout from "components/SeparatorLayout/SeparatorLayout"
import Stack from "components/Stack/Stack"
import { useAppSelector } from "store/hooks"
import { ApplicationState } from "store/slices/application"

const oneViewLinks = [
  {
    id: 1,
    links: [
      { href: "summary", title: "Summary" },
      { href: "customer-details", title: "Customer Details" },
      { href: "loan-details", title: "Loan Details" },
      { href: "allocation-history", title: "Allocation History" },
      { href: "trail-history", title: "Trail History" },
      { href: "payment-history", title: "Payment History" },
      { href: "connect-history", title: "Connect History" },
      { href: "settlement-history", title: "Settlement History" },
      { href: "litigation-history", title: "Litigation History" },
    ],
  },
] as const

interface OneViewProps {
  children: React.ReactNode | null
}

export default function OneViewLayout(props: OneViewProps) {
  const router = useRouter()
  const { appId } = useAppSelector<ApplicationState["application"]>((state) => state.application.application)

  if (!appId) {
    return (
      <Page>
        <div className="m-auto text-center">
          <Heading> No App id selected!</Heading>
        </div>
      </Page>
    )
  }
  return (
    <Page pageTitle="One View">
      <SeparatorLayout>
        <div className="w-1/6 min-w-[320px]">
          <div className="sticky top-3 text-center ">
            <div className="">
              {oneViewLinks.map(({ id, links }) => {
                return (
                  <Stack spacing="sm" className="" key={id}>
                    {links.map((link) => {
                      const isActive = router.pathname === `/one-view/[appId]/${link.href}`
                      return (
                        <React.Fragment key={link.href}>
                          <div
                            className={clsx("flex flex-row justify-between px-2 py-5", {
                              "bg-primary text-white": isActive,
                            })}
                            key={link.href}
                          >
                            <Link href={`/one-view/${appId}/${link.href}`} key={link.href}>
                              {link.title}
                            </Link>
                          </div>
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
        <div className="flex-1 overflow-hidden p-3">{props.children}</div>
      </SeparatorLayout>
    </Page>
  )
}
