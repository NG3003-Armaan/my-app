import clsx from "clsx"
import { twMerge } from "tailwind-merge"

interface DividerProps extends React.ComponentProps<"div"> {
  dir?: "vertical" | "horizontal"
}

export default function Divider({ className, dir = "horizontal", ...props }: DividerProps) {
  return (
    <div
      className={twMerge(
        "bg-muted-gray",
        clsx({
          "mx-3 h-full w-[0.5px]": dir === "vertical",
          "my-3 h-[0.5px] w-full": dir === "horizontal",
        }),
        className
      )}
      {...props}
    />
  )
}
