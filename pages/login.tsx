import Link from "next/link"
import * as React from "react"
import { Button, Heading, Input, LinkIcon } from "components"

export default function Login() {
  return (
    <div className="relative flex min-h-screen items-center justify-center">
      <LinkIcon name="logo" className="absolute right-0 top-0 ml-auto p-2" />
      <LinkIcon name="rahane" className="" />
      <div>
        <div className="mx-auto w-fit rounded-2xl border border-gray-300 bg-very-light-gray p-8">
          <div className="text-center">
            <Heading as="h1" size="2xl" className="mb-3 text-dark-green">
              CollectWiz
            </Heading>
            <p className="underline">Collection Platform for Agents</p>
          </div>
          <div className="mt-8">
            <div>
              <label htmlFor="username">Username</label>
              <Input id="username" className="mt-2 py-1" />
            </div>
            <div className="mt-3">
              <label htmlFor="password">Password</label>
              <Input id="password" className="mt-2 py-1" />
            </div>
            <Link href="/forgot-password" className="mt-2 block text-right">
              Forgot Password?
            </Link>
          </div>
          <Button className="mx-auto mt-8 block w-2/3">LOG IN</Button>
        </div>
        <p className="ml-4 mt-6">Copyright @NeoGrowth 2023 | Privacy Policy</p>
      </div>
      <div className="ml-12 flex items-center">
        <LinkIcon name="home-flower" />
      </div>
    </div>
  )
}
