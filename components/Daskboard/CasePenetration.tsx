import { Stack } from "components"
import { Heading, Tag, TagProps, Wrapper } from "./shared"

interface CasePenetrationProps {
  allocatedAccounts: number
  connectedAccounts: number
}

function PenetrationStatus({ title, value, color }: { title: string; value: number; color: TagProps["color"] }) {
  return (
    <div className="flex flex-col items-center">
      <Tag color={color}>{value}</Tag>
      <p className="mt-3 whitespace-normal text-center font-bold text-gray-600">{title}</p>
    </div>
  )
}

export default function CasePenetration(props: CasePenetrationProps) {
  return (
    <Wrapper>
      <Heading>Case Penetration</Heading>
      <Stack direction="row" className="items-center gap-3 px-3">
        <PenetrationStatus color="yellow" title="Allocated Accounts" value={props.allocatedAccounts} />
        <PenetrationStatus color="green" title="Connected Accounts" value={props.connectedAccounts} />
        <PenetrationStatus
          color="teal"
          title="Accounts not connected"
          value={props.allocatedAccounts - props.connectedAccounts}
        />
      </Stack>
    </Wrapper>
  )
}
