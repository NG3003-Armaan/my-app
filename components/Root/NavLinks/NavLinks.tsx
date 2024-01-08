import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/router"
import * as React from "react"

import { Stack } from "components"

const defaultLinks = [
  { href: "/my-accounts", title: "My Accounts" },
  { href: "/allocation", title: "Allocation" },
  { href: "/trail", title: "Trail Update" },
  { href: "/receipt", title: "Receipts" },
  { href: "/payment", title: "Payments" }, // TODO - remove this to something selse
  { href: "/settlement", title: "Settlement" },
  { href: "/litigation", title: "Litigation" },
]

const pisLinks = [
  { href: "/pis/pending-pis", title: "Pending PIS" },
  { href: "/pis/reconciliation", title: "Reconciliation" },
  { href: "/pis/manual-checker", title: "Manual Checker" },
]

const litigationLinks = [
  { href: "/litigation/eligible-base", title: "Eligible Base" },
  { href: "/litigation/manual-upload", title: "Upload LRN And DN" },
  { href: "/litigation/final-base", title: "Final Base" },
  { href: "/litigation/partial-base", title: "Manual Upload" },
  { href: "/litigation/legal-status", title: "Legal Staus" },
]

const links = {
  default: defaultLinks,
  pis: pisLinks,
  litigation: litigationLinks,
}

function getNavLinks(linkName?: keyof typeof links) {
  if (!linkName || !links[linkName]) {
    return links["default"]
  }

  return links[linkName]
}

export type NavLinksType = keyof typeof links

export default function NavLinks(props: { type?: NavLinksType }) {
  const router = useRouter()

  const currentLinks = getNavLinks(props.type)

  return (
    <Stack className="mt-3 flex justify-center p-3" direction="row" spacing="xl">
      {currentLinks.map((link) => {
        const isActive = router.pathname.includes(link.href)

        return (
          <Link
            href={link.href}
            key={link.href}
            className={clsx("", {
              "font-bold text-primary underline": isActive,
            })}
          >
            {link.title}
          </Link>
        )
      })}
    </Stack>
  )
}
