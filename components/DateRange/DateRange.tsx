import { DateInput } from "components/Form/FormInput"

export default function DateRange() {
  return (
    <div className="flex items-center">
      <div className="rounded-md border-b">
        <DateInput type="text" />
      </div>
      <p className="mx-4">To</p>
      <div className="rounded-md border-b">
        <DateInput type="text" />
      </div>
    </div>
  )
}
