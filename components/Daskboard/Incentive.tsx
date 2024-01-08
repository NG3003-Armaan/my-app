import { Heading, Wrapper } from "./shared"

export default function Incentive({ value }: { value: number }) {
  return (
    <Wrapper>
      <Heading>Incentive</Heading>
      <p>{value} Rs</p>
    </Wrapper>
  )
}
