import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import Divider from "components/Divider/Divider"
import Heading from "components/Heading/Heading"
import Icon from "components/Icon/Icon"
import ImageIcon from "components/ImageIcon/ImageIcon"
import Page from "components/Page/Page"
import SeparatorLayout from "components/SeparatorLayout/SeparatorLayout"
import Stack from "components/Stack/Stack"

const allocationLinks = [
  {
    id: 1,
    links: [
      { href: "/allocation/bulk-upload", title: "Bulk Upload", icon: "upload" },
      { href: "", title: "Download Allocation File", icon: "download" },
    ],
  },
] as const

interface AllocationProps {
  children: React.ReactNode | null
}

export default function AllocationLayout(props: AllocationProps) {
  const router = useRouter()
  return (
    <Page>
      <SeparatorLayout>
        <div className="w-1/6 min-w-[320px]">
          <div className="sticky top-3 py-3 text-center ">
            <Link href="/allocation">
              <ImageIcon name="allocation" className="m-auto mb-2" />
              <Heading as="h4" size="md" className="font-semibold text-primary underline">
                Allocation
              </Heading>
            </Link>
            <div className="mt-5">
              {allocationLinks.map(({ id, links }) => {
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
                            <Icon name={link.icon} />
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
