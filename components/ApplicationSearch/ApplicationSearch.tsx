import clsx from "clsx"
import _ from "lodash"

import { ClearIndicatorProps, components, DropdownIndicatorProps } from "react-select"
import AsyncSelect from "react-select/async"
import Icon from "components/Icon/Icon"
import Stack from "components/Stack/Stack"
import { useAppDispatch } from "store/hooks"
import { getApplication } from "store/slices/application/async-action"

export default function ApplicationSearch() {
  const dispatch = useAppDispatch()

  const options = [
    { value: "1107280", label: "1107280" },
    { value: "1107281", label: "1107281" },
    { value: "1107282", label: "1107282" },
  ]

  return (
    <Stack className="-my-3 w-full" direction="row" spacing="none">
      <Stack direction="row" className="mx-auto w-full max-w-6xl items-center">
        <AsyncSelect
          instanceId="long-value-select"
          // loadOptions={onSearch}
          // value={ { value: "1107280", label: "1107280" }}
          defaultOptions={options}
          components={{ DropdownIndicator, ClearIndicator }}
          isClearable
          className="react-select-container w-full"
          placeholder="Search by App id, customer name, business name, mobile number"
          classNames={{
            control: ({ isFocused }) =>
              clsx("!shadow-none p-1 !rounded-md", {
                "!border-primary !border-2": isFocused,
              }),
            option: ({ isFocused }) =>
              clsx("", {
                "!bg-primary !text-white": isFocused,
              }),
          }}
          onChange={() => {
            dispatch(getApplication({ searchQuery: { value: "1110780", label: "1110780" } }))
          }}
        />
      </Stack>
    </Stack>
  )
}

function DropdownIndicator(props: DropdownIndicatorProps) {
  return (
    <components.DropdownIndicator {...props}>
      <Icon name="search" />
    </components.DropdownIndicator>
  )
}

function ClearIndicator(props: ClearIndicatorProps) {
  return (
    <components.ClearIndicator {...props}>
      <Icon name="close" className="text-danger-red" />
    </components.ClearIndicator>
  )
}
