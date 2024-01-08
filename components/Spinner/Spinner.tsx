import clsx from "clsx"

interface SpinnerProps {
  className?: string
}

export default function Spinner(props: SpinnerProps) {
  return <div className={clsx("loader", props.className)}></div>
}
