import { Heading } from "@radix-ui/themes"
import clsx from "clsx"
import Select from "react-select"
import Input from "components/Input/Input"

const options = [
  { value: "with_range", label: "With Range" },
  { value: "endless", label: "Endless" },
]

export default function BucketModal() {
  return (
    <>
      <Heading className="text-center text-xl !font-semibold text-primary underline">
        Create New Priority Bucket
      </Heading>
      <div className="my-4">
        <div className="flex items-center justify-between py-2">
          <label className="w-[40%] pr-4 text-primary">Bucket Name</label>
          <div className="flex w-[60%] items-center">
            <Input
              value={""}
              onChange={() => {
                //TODO number validation
              }}
              className="flex-1"
            />
          </div>
        </div>
        <div className="flex cursor-pointer items-center justify-between py-2">
          <label className="w-[40%] pr-4 text-primary">Logic type</label>
          <div className="flex w-[60%] items-center">
            <Select
              options={options}
              className="w-full text-sm"
              placeholder="Select Logic type"
              isSearchable={false}
              classNames={{
                control: ({ isFocused }) =>
                  clsx("!shadow-none p-1 !rounded-md", {
                    "!border-primary": isFocused,
                  }),
                option: ({ isFocused, isSelected }) =>
                  clsx("cursor-pointer", {
                    "!bg-transparent": isFocused && !isSelected,
                    "!bg-primary !text-white": isSelected,
                  }),
              }}
            />
          </div>
        </div>
        <div className="flex items-center justify-between py-2">
          <label className="w-[40%] pr-4 text-primary">Logic 1-30 days</label>
          <div className="flex w-[60%] items-center gap-2">
            <div className="flex w-[50%] flex-col">
              <label>Min</label>
              <Input
                value={""}
                onChange={() => {
                  //TODO number validation
                }}
                className="flex-1"
              />
            </div>
            <div className="flex w-[50%] flex-col">
              <label>Max</label>
              <Input
                value={""}
                onChange={() => {
                  //TODO number validation
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between py-2">
          <label className="w-[40%] pr-4 text-primary">Logic 2-31 days</label>
          <div className="flex w-[60%] items-center gap-2">
            <div className="flex w-[50%] flex-col">
              <label>Min</label>
              <Input
                value={""}
                onChange={() => {
                  //TODO number validation
                }}
                className="flex-1"
              />
            </div>
            <div className="flex w-[50%] flex-col">
              <label>Max</label>
              <Input
                value={""}
                onChange={() => {
                  //TODO number validation
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
