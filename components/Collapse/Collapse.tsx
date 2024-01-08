import clsx from "clsx"
import * as React from "react"

import Button from "components/Button/Button"
import Icon from "components/Icon/Icon"

interface CollapseProps {
  defaultCollapsed?: boolean
  children: React.ReactNode
  title: string
}

export default function Collapse(props: CollapseProps) {
  const [collapsed, setCollapsed] = React.useState(props.defaultCollapsed)

  return (
    <div>
      <Button className="w-full p-0" variant="ghost" onClick={() => setCollapsed((state) => !state)}>
        <div
          className={clsx("flex items-center justify-between rounded-md border p-3", {
            "rounded-b-none": collapsed,
          })}
        >
          <p>{props.title}</p>
          {collapsed ? <Icon name="arrowUp" /> : <Icon name="arrowDown" />}
        </div>
      </Button>
      {collapsed && <div className="rounded-b border border-t-0">{props.children}</div>}
    </div>
  )
}
