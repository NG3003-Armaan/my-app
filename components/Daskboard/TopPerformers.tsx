import { Stack } from "components"
import { Heading, Wrapper } from "./shared"

interface TopPerformersProps {
  data: Array<{ id: string | number; name: string; score: number }>
}

export default function TopPerformers(props: TopPerformersProps) {
  return (
    <Wrapper>
      <Heading>Top Performers</Heading>
      <Stack>
        {props.data.map((e, idx) => (
          <div key={e.id}>
            {idx + 1}. {e.name} (<span className="text-primary">{e.score}%</span>)
          </div>
        ))}
      </Stack>
    </Wrapper>
  )
}
