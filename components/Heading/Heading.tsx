import { cva, type VariantProps } from "class-variance-authority"

import { twMerge } from "tailwind-merge"

type HeadingTypes = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

// eslint-disable-next-line tailwindcss/no-custom-classname
const heading = cva(["rounded-md"], {
  variants: {
    variant: {
      primary: ["text-primary font-bold"],
      secondary: ["text-black font-bold"],
    },
    size: {
      sm: ["text-sm"],
      md: ["text-md"],
      lg: ["text-lg"],
      xl: ["text-xl"],
      "2xl": ["text-2xl"],
    },
  },
  defaultVariants: {
    variant: "secondary",
    size: "lg",
  },
})

export interface HeadingProps extends React.ComponentProps<HeadingTypes>, VariantProps<typeof heading> {
  as?: HeadingTypes
}

// TODO - rewrite this with better login later
export default function Heading({ as, variant, size, className, ...props }: HeadingProps) {
  if (as && !["h1", "h2", "h3", "h4", "h5", "h6"].includes(as)) {
    console.warn(`Invalid heading tag '${as}' passed. Accepted values are h1, h2, h3, h4, h5, h6`)
  }

  const Tag = as || "h2"

  return <Tag {...props} className={twMerge(heading({ variant, size, className }))} />
}
