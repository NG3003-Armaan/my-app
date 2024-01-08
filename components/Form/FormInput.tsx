import clsx from "clsx"
import * as React from "react"

import { twMerge } from "tailwind-merge"
import ErrorMessage from "components/ErrorMessage/ErrorMessage"
import { TextInput } from "components/Input/Input"
import SelectInput, { SelectInputProps } from "components/SelectInput/SelectInput"
import TextAreaInput from "components/TextAreaInput/TextAreaInput"
import { ValidationResult } from "types/store"

interface InputProps {
  label: string
  children: React.ReactNode
}

function FormInput(props: InputProps & ValidationResult) {
  return (
    <div
      className={clsx("flex", {
        "items-start": props.isInvalid,
        "items-center": !props.isInvalid,
      })}
    >
      <label className="w-[30%]">
        <p>{props.label}</p>
      </label>
      <div className="w-[70%]">
        <div className="overflow-hidden rounded-md border">{props.children}</div>
        <ErrorMessage isInvalid={props.isInvalid} className="mt-2">
          {props.errorMessage}
        </ErrorMessage>
      </div>
    </div>
  )
}

FormInput.Text = function Text({
  label,
  className,
  isInvalid,
  errorMessage,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string } & ValidationResult) {
  return (
    <FormInput label={label} isInvalid={isInvalid} errorMessage={errorMessage}>
      <TextInput {...props} className={clsx("w-full", className)} />
    </FormInput>
  )
}

FormInput.Number = function Number({
  label,
  className,
  isInvalid,
  errorMessage,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string } & ValidationResult) {
  return (
    <FormInput label={label} isInvalid={isInvalid} errorMessage={errorMessage}>
      <input {...props} type="number" className={clsx("w-full px-3 py-2 outline-none", className)} />
    </FormInput>
  )
}

FormInput.SelectInput = function Select({
  label,
  className,
  isInvalid,
  errorMessage,
  ...props
}: { label: string } & SelectInputProps & ValidationResult) {
  return (
    <FormInput label={label} isInvalid={isInvalid} errorMessage={errorMessage}>
      <SelectInput {...props} className={clsx("w-full", className)} />
    </FormInput>
  )
}

function FileUpload() {
  return (
    <div>
      <input type="file" />
    </div>
  )
}

FormInput.FileUpload = function AgencyFileUpload({
  label,
  errorMessage,
  isInvalid,
  ...props
}: { label: string } & React.ComponentProps<"input"> & ValidationResult) {
  return (
    <FormInput label={label} isInvalid={isInvalid} errorMessage={errorMessage}>
      <FileUpload {...props} />
    </FormInput>
  )
}

FormInput.Date = function AgencyDate({
  errorMessage,
  isInvalid,
  label,
  ...props
}: { label: string } & React.ComponentProps<"input"> & ValidationResult) {
  return (
    <FormInput label={label} errorMessage={errorMessage} isInvalid={isInvalid}>
      <DateInput {...props} />
    </FormInput>
  )
}

export function DateInput({ className, ...props }: React.ComponentProps<"input">) {
  return <input {...props} className={twMerge("w-full px-3 py-2 outline-none", className)} type="date" />
}

FormInput.TextArea = function FormTextArea({
  errorMessage,
  isInvalid,
  label,
  className,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLTextAreaElement> & ValidationResult) {
  return (
    <FormInput label={label} errorMessage={errorMessage} isInvalid={isInvalid}>
      <TextAreaInput {...props} className={clsx("w-full", className)} />
    </FormInput>
  )
}

export default FormInput
