import { twMerge } from "tailwind-merge"
import { Brand } from "types/utility"

export type OptionType = { id: string | number; value: number | string; title: string }

export type SelectInputProps = React.ComponentProps<"select"> & {
  title: string
} & (
    | { children: React.ReactNode; options?: Array<OptionType> }
    | { children?: React.ReactNode; options: Array<OptionType> }
  )

export type SelectInputDefaultValueType<T> = Brand<string, "SelectInputDefault"> | T

export const SelectInputDefaultValue = "" as SelectInputDefaultValueType<string>

export default function SelectInput({ options, title, className, children, ...props }: SelectInputProps) {
  return (
    <div className={twMerge("overflow-hidden rounded-md border", className)}>
      <select className="w-full rounded-md bg-transparent p-2 outline-none" {...props}>
        <>
          {title ? (
            <option disabled value={SelectInputDefaultValue}>
              {title}
            </option>
          ) : null}

          {options ? (
            <>
              {options.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.title}
                </option>
              ))}
            </>
          ) : (
            <>{children}</>
          )}
        </>
      </select>
    </div>
  )
}
