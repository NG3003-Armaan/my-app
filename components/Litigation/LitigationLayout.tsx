import clsx from "clsx"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { Divider, Heading, ImageIcon, Page, SeparatorLayout, Stack } from "components"

interface Litigationprops {
  screen: string
  iconName: string
  title: string
  children: React.ReactNode | null
}

const legalStatusSubLinks = [
  { href: "/litigation/legal-status", title: "Case Status" },
  { href: "/litigation/upload-case-status", title: "Upload Case Status" },
]

export default function LitigationLayout(props: Litigationprops) {
  const router = useRouter()

  return (
    <Page navLinks="litigation">
      <Head>
        <title>Litigation</title>
      </Head>
      <SeparatorLayout>
        <div className="w-1/4 min-w-[200px]">
          <div className="sticky top-3 py-3 text-center">
            <ImageIcon name={props.iconName} className="m-auto mb-2 w-10" />
            <Heading as="h4" size="md" className="font-semibold text-primary underline">
              {props.title}
            </Heading>
            <Divider />
          </div>
          {props.screen === "Legal-status" && (
            <div className="">
              <Stack spacing="sm">
                {legalStatusSubLinks.map((link) => {
                  const isActive = router.pathname === link.href
                  return (
                    <React.Fragment key={link.href}>
                      <div
                        className={clsx("flex flex-row justify-between px-2 py-6", {
                          "bg-primary text-white": isActive,
                        })}
                        key={link.href}
                      >
                        <Link href={link.href}>{link.title}</Link>
                      </div>
                      <Divider className="my-1" />
                    </React.Fragment>
                  )
                })}
              </Stack>
            </div>
          )}
        </div>
        <div className="flex-1 overflow-hidden p-3">{props.children}</div>
      </SeparatorLayout>
    </Page>
  )
}
