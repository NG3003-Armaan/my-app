import React from "react"
import { twMerge } from "tailwind-merge"

const TextAreaInput = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return <textarea {...props} ref={ref} className={twMerge("rounded-[inherit] px-3 py-2 outline-none", className)} />
  }
)

TextAreaInput.displayName = "Input"

export default TextAreaInput
