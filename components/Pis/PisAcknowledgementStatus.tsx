import React from "react"

import { Divider, Stack } from "components"
import { Heading, Tag, TagProps, Wrapper } from "./shared"

interface ScheduledPromiseToPayProps {
  todaysPIS: number
  weekPIS: number
  monthPIS: number
  matchedPIS: number
  mismatchedPIS: number
}

interface PISDisplayProps {
  title: string
  value: number
  color: TagProps["color"]
}

function PISDisplay(props: PISDisplayProps) {
  return (
    <div className="flex w-full items-center">
      <p className="flex-[0.7]">{props.title}</p>
      <div className="flex-[0.3]">
        <Tag color={props.color}>{props.value}</Tag>
      </div>
    </div>
  )
}

export default function PisAcknowledgementStatus(props: ScheduledPromiseToPayProps) {
  return (
    <Wrapper>
      <Heading>PIS Acknowledgement Status</Heading>
      <div className="my-6 flex items-center justify-center px-3">
        <Stack className="flex-[0.49]">
          <PISDisplay color="none" title="Today's PIS" value={props.todaysPIS} />
          <PISDisplay color="none" title="Week's PIS" value={props.weekPIS} />
          <PISDisplay color="none" title="Monthly's PIS" value={props.monthPIS} />
        </Stack>
        <Divider dir="vertical" className="min-h-[8rem] flex-[0.001]" />
        <Stack className="flex-[0.49]">
          <PISDisplay color="yellow" title="Matched PIS" value={props.matchedPIS} />
          <PISDisplay color="teal" title="Mismatched PIS" value={props.mismatchedPIS} />
        </Stack>
      </div>
    </Wrapper>
  )
}
