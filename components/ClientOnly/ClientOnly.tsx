import * as React from "react"

import { useMounted } from "utils/hooks"

export default function ClientOnly({ children }: { children: React.ReactNode }) {
  const mounted = useMounted()

  return mounted ? children : null
}
