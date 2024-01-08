import { Stack } from "components"
import { Heading, Tag, TagProps, Wrapper } from "./shared"

interface PisPenetrationProps {
  totalPis: number
  pisAcknowledged: number
  pendingPis: number
}

function PenetrationStatus({ title, value, color }: { title: string; value: number; color: TagProps["color"] }) {
  return (
    <div className="flex flex-col items-center">
      <Tag color={color}>{value}</Tag>
      <p className="mt-3 whitespace-normal text-center font-bold text-gray-600">{title}</p>
    </div>
  )
}

export default function PisPenetration(props: PisPenetrationProps) {
  return (
    <Wrapper>
      <Heading>PIS Penetration</Heading>
      <Stack direction="row" className="items-center gap-3 px-3">
        <PenetrationStatus color="yellow" title="Total PIS" value={props.totalPis} />
        <PenetrationStatus color="green" title="PIS Ack" value={props.pisAcknowledged} />
        <PenetrationStatus color="teal" title="PIS Pending" value={props.pendingPis} />
      </Stack>
    </Wrapper>
  )
}
