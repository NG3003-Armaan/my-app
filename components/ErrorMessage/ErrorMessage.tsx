import * as React from "react"
import { twMerge } from "tailwind-merge"

export interface ErrorMessageProps {
  isInvalid: boolean
  children: React.ReactNode
}

export default function ErrorMessage({
  isInvalid,
  children,
  className,
  ...props
}: ErrorMessageProps & React.ComponentProps<"p">) {
  if (!isInvalid) return null

  return (
    <p className={twMerge("text-sm text-red", className)} {...props}>
      {children}
    </p>
  )
}
