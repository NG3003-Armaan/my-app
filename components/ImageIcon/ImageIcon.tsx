import { twMerge } from "tailwind-merge"

interface ImageIconProps {
  name: string
  className?: string
}

export default function ImageIcon(props: ImageIconProps) {
  return <img src={`/icons/${props.name}.svg`} alt={props.name} className={twMerge("w-14", props.className)} />
}
