import Link from "next/link"

import { Stack } from "components"

export default function Footer() {
  return (
    <footer className="flex items-center bg-dark-blue p-3 text-white">
      <Stack direction="row">
        <Link href="#">Helpdesk</Link>
        <span>|</span>
        <Link href="#">FAQs</Link>
        <span>|</span>
        <Link href="#">Terms and conditions</Link>
      </Stack>
      <div className="ml-auto w-fit">
        <p>@Neogrowth Credit Pvt. Ltd.</p>
      </div>
    </footer>
  )
}
