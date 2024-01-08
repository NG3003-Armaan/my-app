import { Divider, ProgressBar, Stack } from "components"
import { Heading, Tag, TagProps, Wrapper } from "./shared"

interface ScheduledPromiseToPayProps {
  todaysPTP: number
  weekPTP: number
  monthPTP: number
  totalPTP: number
  brokenPTP: number
}

interface PTPDisplayProps {
  title: string
  value: number
  color: TagProps["color"]
}

function PTPDisplay(props: PTPDisplayProps) {
  return (
    <div className="flex w-full items-center">
      <p className="flex-[0.7]">{props.title}</p>
      <div className="flex-[0.3]">
        <Tag color={props.color}>{props.value}</Tag>
      </div>
    </div>
  )
}

export default function ScheduledPromiseToPay(props: ScheduledPromiseToPayProps) {
  return (
    <Wrapper>
      <Heading>Scheduled Promise to Pay</Heading>
      <div className="my-6 flex items-center justify-center px-3">
        <Stack className="flex-[0.49]">
          <PTPDisplay color="none" title="Today's PTP" value={props.todaysPTP} />
          <PTPDisplay color="none" title="Week's PTP" value={props.weekPTP} />
          <PTPDisplay color="none" title="Monthly's PTP" value={props.monthPTP} />
        </Stack>
        <Divider dir="vertical" className="min-h-[8rem] flex-[0.001]" />
        <Stack className="flex-[0.49]">
          <PTPDisplay color="yellow" title="Total PTP" value={props.totalPTP} />
          <PTPDisplay color="teal" title="Broken PTP" value={props.brokenPTP} />
        </Stack>
      </div>
      <Heading>PTP Conversion Rate</Heading>
      <ProgressBar progress={98} />
    </Wrapper>
  )
}
