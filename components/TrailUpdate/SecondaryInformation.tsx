import FormInput from "components/Form/FormInput"
import Heading from "components/Heading/Heading"
import Stack from "components/Stack/Stack"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { trailAction, TrailState } from "store/slices/trail"

type Props = { disabled: boolean }

export default function SecondaryInformation({ disabled }: Props) {
  const { address, mobileNumber, pincode } = useAppSelector<TrailState["secondaryInformation"]>(
    (state) => state.trail.secondaryInformation
  )
  const invalidFields = useAppSelector<TrailState["invalidFields"]["secondaryInformation"]>(
    (state) => state.trail.invalidFields.secondaryInformation
  )
  const dispatch = useAppDispatch()
  return (
    <>
      <div className="mb-8 flex flex-row items-center justify-between border-b-2 border-b-primary pb-4">
        <Heading className=" underline" size={"xl"}>
          Secondary Information
        </Heading>
      </div>
      <div className="ml-16 max-w-[800px]">
        <Stack spacing={"xl"}>
          <FormInput.Text
            label="Mobile Number"
            placeholder="Enter Mobile Number"
            {...invalidFields.mobileNumber}
            maxLength={10}
            minLength={10}
            value={mobileNumber}
            onChange={(e) => dispatch(trailAction.setMobileNumber(e.target.value))}
            disabled={disabled}
          />

          <FormInput.TextArea
            label="Address"
            placeholder="Enter Address"
            {...invalidFields.address}
            value={address}
            onChange={(e) => dispatch(trailAction.setAddress(e.target.value))}
            disabled={disabled}
          />
          <FormInput.Text
            label="Pincode"
            maxLength={6}
            minLength={6}
            placeholder="Enter Pincode"
            {...invalidFields.pincode}
            value={pincode}
            onChange={(e) => dispatch(trailAction.setPincode(e.target.value))}
            disabled={disabled}
          />
        </Stack>
      </div>
    </>
  )
}
