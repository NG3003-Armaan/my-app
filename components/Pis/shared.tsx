import clsx from "clsx"
import { Heading as RawHeading } from "components"

import { HeadingProps } from "components/Heading/Heading"

export function Wrapper({ children }: { children: React.ReactNode }) {
  return <div className="h-fit rounded-md border p-3">{children}</div>
}

export function Heading({ className, ...props }: HeadingProps) {
  return <RawHeading as="h3" {...props} className={clsx(className, "mb-3 text-center italic text-primary")} />
}

export interface TagProps {
  children: React.ReactNode
  // TODO - find a way to only need to pass the color name
  color: "teal" | "yellow" | "green" | "none"
}

export function Tag({ children, color }: TagProps) {
  // TODO - use the cva for this.
  const bg = {
    teal: "bg-cp-teal",
    yellow: "bg-cp-yellow",
    green: "bg-cp-green",
    none: "text-black bg-white border-cp-green border",
  }

  return (
    <div
      className={clsx(
        "w-fit rounded-2xl px-6 py-1 text-center",
        {
          "text-white": color !== "none",
        },
        bg[color]
      )}
    >
      {children}
    </div>
  )
}
