import { Children, JSX } from "react"

interface SeparatorLayoutProps {
  children: React.ReactNode
}

export default function SeparatorLayout(props: SeparatorLayoutProps) {
  const result: JSX.Element[] = []
  Children.forEach(props.children, (child, index) => {
    result.push(child as JSX.Element)
    result.push(<div key={index} className="my-3 h-auto w-[0.5px] bg-muted-gray" />)
  })
  result.pop() // Remove the last separator
  return result
}
