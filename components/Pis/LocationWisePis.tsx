import { Stack } from "components"
import { Heading, Wrapper } from "./shared"

interface LocationWiseProps {
  data: Array<{ locationName: string; count: number }>
}

export default function LocationWisePis(props: LocationWiseProps) {
  return (
    <Wrapper>
      <Heading>Location Wise PIS</Heading>
      <Stack>
        {props.data.map((e, idx) => (
          <div key={e.locationName}>
            {idx + 1}. {e.locationName} (<span className="text-primary">{e.count}</span>)
          </div>
        ))}
      </Stack>
    </Wrapper>
  )
}
