import { cva, type VariantProps } from "class-variance-authority"

import { twMerge } from "tailwind-merge"

// eslint-disable-next-line tailwindcss/no-custom-classname
const button = cva(["rounded-md"], {
  variants: {
    variant: {
      primary: ["bg-primary", "text-white"],
      secondary: ["bg-white", "text-black", "border", "rounded-md"],
      ghost: [],
      link: [],
    },
    size: {
      sm: ["min-w-20", "min-h-10", "text-sm", "py-1.5", "px-4"],
      lg: ["min-w-32", "min-h-12", "text-lg", "py-2.5", "px-6"],
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "lg",
  },
})

export interface ButtonProps extends React.ComponentProps<"button">, VariantProps<typeof button> {}

export default function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button className={twMerge(button({ variant, size, className }))} {...props}>
      {props.children}
    </button>
  )
}
