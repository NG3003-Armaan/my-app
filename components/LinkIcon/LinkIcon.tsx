import * as React from "react"
import { twMerge } from "tailwind-merge"

const iconNames = ["congrats", "sad-face", "logo", "rahane", "home-flower", "flower", "error", "success"] as const

type IconName = (typeof iconNames)[number]

interface LinkIconProps extends React.ComponentProps<"img"> {
  name: IconName
}

export default function LinkIcon({ name, className, ...props }: LinkIconProps) {
  return <img {...props} src={`/icons/${name}.svg`} alt={`${name} icon`} className={twMerge("block", className)} />
}
