import * as Dialog from "@radix-ui/react-dialog"
import Link from "next/link"
import { useRouter } from "next/router"
import * as React from "react"
import { twMerge } from "tailwind-merge"

import { ApplicationSearch, Button, Heading, Icon, Sidebar, Stack } from "components"
import { IconType } from "components/Icon/Icon"

interface NavIconProps {
  name: IconType
  title: string
  onClick: () => void
  className?: string
}

function NavIcon({ onClick, name, title, className }: NavIconProps) {
  return (
    <Stack className={twMerge("cursor-pointer items-center", className)} onClick={onClick} spacing="sm">
      <Icon name={name} className="text-primary" />
      <p className="text-muted-gray">{title}</p>
    </Stack>
  )
}

const sidebarLinks = [
  { href: "/my-profile", title: "My Profile", icon: "user" },
  { href: "/dashboard", title: "Dashboard", icon: "barchart" },
  { href: "/user-management/ng-employee/add", title: "User Management", icon: "grid" },
  { href: "/settings", title: "Settings", icon: "settings" },
] as const

export default function TopNavbar() {
  const [showSidebar, setShowSidebar] = React.useState(false)
  const router = useRouter()
  return (
    <nav className="flex items-center justify-evenly border-b-[0.5px] border-muted-gray px-5 py-3 text-sm">
      <Stack direction="row" spacing="lg">
        <NavIcon name="menu" title="Menu" onClick={() => setShowSidebar(true)} />
        <NavIcon name="home" title="Home" onClick={() => router.push("/")} />
        <NavIcon name="alert" title="Alerts" onClick={() => null} />
      </Stack>
      <div className="mx-3 h-full w-[0.5px] bg-black" />
      <ApplicationSearch />
      <div className="mx-3 h-full w-[0.5px] bg-black" />
      <img src="/icons/logo.svg" alt="Neogrowth Logo" className="w-48" />
      <Sidebar isOpen={showSidebar} onOpenChange={() => setShowSidebar((state) => !state)}>
        <div className="flex justify-between p-2">
          <Dialog.Close>
            <Icon name="close" size={30} className="text-primary" />
          </Dialog.Close>
          <div>
            <Heading className="font-bold">Suraj Mohanty</Heading>
            <p className="text-muted-gray">User Access manager</p>
          </div>
        </div>

        <Heading className="my-2 border-b px-3 pt-4 font-medium text-primary">Welcome</Heading>
        <div className="mt-6">
          {sidebarLinks.map((link) => {
            return (
              <Link
                href={link.href}
                key={link.href}
                className="flex items-center gap-3 border-b px-3 py-5 hover:text-primary"
              >
                <Icon name={link.icon} />
                {link.title}
              </Link>
            )
          })}
          {/* TODO - achieve this without using absolute */}
          <div className="absolute inset-x-0 bottom-3">
            <Button variant={"link"} className="mx-auto block">
              <Icon name="power" className="m-auto mb-2 text-danger-red" />
              Logout
            </Button>
          </div>
        </div>
      </Sidebar>
    </nav>
  )
}
