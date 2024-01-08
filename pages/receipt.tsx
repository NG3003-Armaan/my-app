import clsx from "clsx"
import Head from "next/head"
import Link from "next/link"
import * as React from "react"
import { useState } from "react"
import { AppDetail, Button, Divider, FormInput, Heading, ImageIcon, Page, SeparatorLayout, Stack } from "components"

import { API } from "service"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { ApplicationState } from "store/slices/application"
import { receiptAction, ReceiptState } from "store/slices/receipts"
import { createReceipt } from "store/slices/receipts/async-actions"
import { PageServerSideProps } from "types"
import { isAmountGreaterThan50k } from "utils/helpers/receipts"

export default function Receipt(props: PageServerSideProps<typeof getServerSideProps>) {
  const { application } = useAppSelector<ApplicationState>((state) => state.application)
  const {
    amount,
    paymentMode,
    agentPanNumber: panNumber,
  } = useAppSelector<ReceiptState["receiptInformation"]>((state) => state.receipt.receiptInformation)

  const invalidFields = useAppSelector<ReceiptState["invalidFields"]["receiptInformation"]>(
    (state) => state.receipt.invalidFields.receiptInformation
  )
  const disabled = !application.appId
  const dispatch = useAppDispatch()

  const [previewUrl, setPreviewUrl] = useState("")

  return (
    <Page>
      <Head>
        <title>Receipt</title>
      </Head>
      <SeparatorLayout>
        <div className="relative w-1/6 min-w-[320px]">
          <div className="sticky top-3 py-3 text-center">
            <ImageIcon name="receipts" className="m-auto mb-2 w-10" />
            <Heading as="h4" size="md" className="font-semibold text-primary underline">
              Receipts
            </Heading>
            <Divider />

            <AppDetail application={application} />
          </div>
        </div>

        <div className="flex-1 p-3">
          <Link href="/receipts/acknowledge" className="mb-3 inline-block rounded-md bg-primary p-3 text-white">
            Acknowledge Receipts
          </Link>
          <div
            className={clsx("", {
              "opacity-50": !application.appId,
            })}
          >
            <div className="mb-8 flex flex-row items-center justify-between border-b-2 border-b-primary pb-4">
              <Heading className=" underline" size={"xl"}>
                Receipt Information
              </Heading>
            </div>
            <div className="ml-16 max-w-[800px]">
              <Stack spacing={"xl"}>
                <FormInput.SelectInput
                  label="Payment Mode"
                  title="Select Payment Mode"
                  {...invalidFields.paymentMode}
                  options={props.paymentModes}
                  value={paymentMode}
                  onChange={(e) => dispatch(receiptAction.setPaymentMode(e.target.value))}
                  disabled={disabled}
                />
                <FormInput.Text
                  label="Amount"
                  title="Enter Amount"
                  {...invalidFields.amount}
                  value={amount}
                  onChange={(e) => dispatch(receiptAction.setAmount(e.target.value))}
                  disabled={disabled}
                />
                {isAmountGreaterThan50k(amount) && (
                  <FormInput.Text
                    label="Pan Number"
                    title="Enter Pan Number"
                    placeholder="XXXXX0000X"
                    {...invalidFields.agentPanNumber}
                    value={panNumber}
                    onChange={(e) => dispatch(receiptAction.setAgentPanNumber(e.target.value.toUpperCase()))}
                    disabled={disabled}
                  />
                )}
                <FormInput.FileUpload
                  label="Payment Proof"
                  {...invalidFields.paymentProof}
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files
                    const url = file && file.length > 0 && URL.createObjectURL(file[0])
                    url && setPreviewUrl(url)
                  }}
                  disabled={disabled}
                />
                <div className="flex items-center">
                  <label className="w-[30%]">
                    <p>Preview</p>
                  </label>
                  <div className=" flex h-[150px] w-[200px] items-center justify-center border">
                    {previewUrl ? (
                      <img src={previewUrl} className="h-full w-full" alt="preview" />
                    ) : (
                      <p>No file chosen</p>
                    )}
                  </div>
                </div>
              </Stack>
            </div>
            <Stack direction="row" className="mx-auto mt-8 w-fit">
              <Button onClick={() => dispatch(createReceipt())} disabled={disabled}>
                Submit
              </Button>
              <Button variant="secondary" onClick={() => dispatch(receiptAction.resetFields())}>
                Cancel
              </Button>
            </Stack>
          </div>
        </div>
      </SeparatorLayout>
    </Page>
  )
}

export const getServerSideProps = async () => {
  try {
    const {
      data: { paymentModes },
    } = await API.getReceiptsMasterData()

    return { props: { paymentModes } }
  } catch (err) {
    return {
      props: {
        paymentModes: [],
      },
    }
  }
}
