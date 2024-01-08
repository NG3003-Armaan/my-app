import React from "react"
import { twMerge } from "tailwind-merge"

interface InputProps extends React.ComponentProps<"input"> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ leftIcon = null, className, rightIcon = null, ...props }, ref) => {
    return (
      <div className="flex w-full items-center gap-2 rounded-md border border-muted-gray focus-within:border-primary">
        {leftIcon}
        <input
          {...props}
          ref={ref}
          type="text"
          className={twMerge("w-full rounded-[inherit] px-3 py-2 outline-none", className)}
        />
        {rightIcon}
      </div>
    )
  }
)

Input.displayName = "Input"

export const TextInput = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return <input {...props} ref={ref} type="text" className={twMerge("px-3 py-2 outline-none", className)} />
})

TextInput.displayName = "TextInput"

Input.displayName = "Input"

export default Input
