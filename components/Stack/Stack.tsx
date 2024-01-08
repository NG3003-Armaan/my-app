import { cva, type VariantProps } from "class-variance-authority"
import clsx from "clsx"
import * as React from "react"
import { twMerge } from "tailwind-merge"

const stack = cva(["flex"], {
  variants: {
    direction: {
      row: "flex-row",
      column: "flex-col",
    },
  },
  defaultVariants: {
    direction: "column",
  },
})

const rowSpacing = cva([], {
  variants: {
    spacing: {
      none: "w-0",
      sm: "w-1",
      md: "w-3",
      lg: "w-6",
      xl: "w-10",
    },
  },
  defaultVariants: {
    spacing: "md",
  },
})

const columnSpacing = cva([], {
  variants: {
    spacing: {
      none: "h-0",
      sm: "h-1",
      md: "h-3",
      lg: "h-6",
      xl: "h-10",
    },
  },
  defaultVariants: {
    spacing: "md",
  },
})

interface StackProps extends React.ComponentProps<"div">, VariantProps<typeof stack>, VariantProps<typeof rowSpacing> {
  direction?: "row" | "column"
  divider?: React.ReactNode
}

// TODO - add option to add divider
export default function Stack({ divider, direction = "column", spacing, children, className, ...props }: StackProps) {
  return (
    <div className={twMerge(stack({ direction }), className)} {...props}>
      {React.Children.map(children, (el) => {
        return (
          <>
            <>{el}</>
            {divider ? (
              divider
            ) : (
              <span
                className={clsx("block", {
                  [rowSpacing({ spacing })]: direction === "row",
                  [columnSpacing({ spacing })]: direction === "column",
                })}
              />
            )}
          </>
        )
      })}
    </div>
  )
}
