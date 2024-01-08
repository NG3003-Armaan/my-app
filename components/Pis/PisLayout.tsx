import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import Divider from "components/Divider/Divider"
import Heading from "components/Heading/Heading"
import ImageIcon from "components/ImageIcon/ImageIcon"
import Page from "components/Page/Page"
import SeparatorLayout from "components/SeparatorLayout/SeparatorLayout"
import Stack from "components/Stack/Stack"

const pisLinks = [
  {
    id: 1,
    links: [
      { href: "/pis/reconciliation", title: "Bank Statement" },
      { href: "/pis/acknowledge-pis", title: "Acknowledge PIS" },
    ],
  },
] as const

const manualCheckerLinks = [
  {
    id: 1,
    links: [
      { href: "/pis/manual-checker", title: "Edit" },
      { href: "/pis/manual-acknowledge-pis", title: "Manual Acknowledge PIS" },
    ],
  },
] as const

interface PisProps {
  type?: string
  children: React.ReactNode | null
}

export default function PisLayout(props: PisProps) {
  const currentLinks = props.type === "manualChecker" ? manualCheckerLinks : pisLinks

  const router = useRouter()
  return (
    <Page navLinks="pis">
      <SeparatorLayout>
        <div className="w-1/6 min-w-[320px]">
          <div className="sticky top-3 py-3 text-center ">
            {props.type === "manualChecker" ? (
              <Link href="/pis">
                <ImageIcon name="manual-checker" className="m-auto mb-2" />
                <Heading as="h4" size="md" className="font-semibold text-primary underline">
                  Manual Checker
                </Heading>
              </Link>
            ) : (
              <Link href="/pis">
                <ImageIcon name="pis" className="m-auto mb-2" />
                <Heading as="h4" size="md" className="font-semibold text-primary underline">
                  Pis
                </Heading>
              </Link>
            )}

            <div className="mt-5">
              {currentLinks.map(({ id, links }) => {
                return (
                  <Stack spacing="sm" className="" key={id}>
                    {links.map((link) => {
                      const isActive = router.pathname === link.href

                      return (
                        <React.Fragment key={link.href}>
                          <div
                            className={clsx("flex flex-row justify-between px-2 py-6", {
                              "bg-primary text-white": isActive,
                            })}
                            key={link.href}
                          >
                            <Link href={link.href} key={link.href}>
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
