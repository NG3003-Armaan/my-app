import clsx from "clsx"
import Head from "next/head"
import { Divider, Footer, RootNavLinks, TopNavbar } from "components"
import { NavLinksType } from "components/Root/NavLinks/NavLinks"

interface PageProps {
  children: React.ReactNode
  className?: string
  pageTitle?: string
  navLinks?: NavLinksType
}

export default function Page(props: PageProps) {
  return (
    <>
      <Head>
        <title>{props.pageTitle}</title>
      </Head>
      <TopNavbar />
      <RootNavLinks type={props.navLinks} />
      <Divider />

      <div className={clsx("flex flex-1", props.className)}>{props.children}</div>
      <div className="mt-auto">
        <Footer />
      </div>
    </>
  )
}
