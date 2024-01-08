import { ProgressBar } from "components"
import { findPercentage } from "utils"
import { Heading, Wrapper } from "./shared"

interface TargetVsAchievedProps {
  target: number
  achieved: number
}

export default function TargetVsAchieved(props: TargetVsAchievedProps) {
  return (
    <Wrapper>
      <Heading>Target Vs Achieved</Heading>
      <ProgressBar progress={findPercentage({ value: props.achieved, total: props.target })} />
    </Wrapper>
  )
}
