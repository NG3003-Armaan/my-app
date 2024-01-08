import clsx from "clsx"
import Head from "next/head"
import { useEffect } from "react"
import { AppDetail, Button, Divider, FormInput, Heading, ImageIcon, Page, SeparatorLayout, Stack } from "components"
import { API } from "service"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { appActions } from "store/slice"
import { ApplicationState } from "store/slices/application"
import { receiptAction, ReceiptState } from "store/slices/receipts"
import { sendPaymentLink } from "store/slices/receipts/async-actions"
import { PageServerSideProps } from "types"

export default function Payment(props: PageServerSideProps<typeof getServerSideProps>) {
  const { application } = useAppSelector<ApplicationState>((state) => state.application)

  async function fetchDueAmount() {
    try {
      const { data: amount } = await API.fetchDueAmount(application.appId)
      dispatch(receiptAction.setAmount(amount))
    } catch (err) {
      dispatch(appActions.setPopupErrorNotification({ message: "Error in fetching due amount" }))
    }
  }
  useEffect(() => {
    fetchDueAmount()
  }, [])

  const { amount, paymentMode, paymentLink } = useAppSelector<ReceiptState["receiptInformation"]>(
    (state) => state.receipt.receiptInformation
  )

  const invalidFields = useAppSelector<ReceiptState["invalidFields"]["receiptInformation"]>(
    (state) => state.receipt.invalidFields.receiptInformation
  )
  const disabled = !application.appId
  const dispatch = useAppDispatch()
  return (
    <Page>
      <Head>
        <title>Payment</title>
      </Head>
      <SeparatorLayout>
        <div className="relative w-1/6 min-w-[320px]">
          <div className="sticky top-3 py-3 text-center">
            <ImageIcon name="payments" className="m-auto mb-2 w-10" />
            <Heading as="h4" size="md" className="font-semibold text-primary underline">
              Payments
            </Heading>
            <Divider />

            <AppDetail application={application} />
          </div>
        </div>

        <div className="flex-1 p-3">
          <div
            className={clsx("", {
              "opacity-50": !application.appId,
            })}
          >
            <div className="mb-8 flex flex-row items-center justify-between border-b-2 border-b-primary pb-4">
              <Heading className=" underline" size={"xl"}>
                Request Payment
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
                  label="Payment Amount"
                  title="Enter Payment Amount"
                  {...invalidFields.amount}
                  value={amount}
                  onChange={(e) => dispatch(receiptAction.setAmount(e.target.value))}
                  disabled={disabled}
                />

                <FormInput.SelectInput
                  label="Payment Link"
                  title="Select Payment Link"
                  {...invalidFields.paymentLink}
                  options={props.paymentLinks}
                  value={paymentLink}
                  onChange={(e) => dispatch(receiptAction.setPaymentLink(e.target.value))}
                  disabled={disabled}
                />
              </Stack>
            </div>
            {/* <SecondaryInformation disabled = {disabled}/> */}
            <Stack direction="row" className="mx-auto mt-8 w-fit">
              <Button onClick={() => dispatch(sendPaymentLink(application.appId))} disabled={disabled}>
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
    const { data: paymentModes } = await API.getPaymentModes()
    const { data: paymentLinks } = await API.getPaymentCommunicationTypes()

    return {
      props: {
        paymentModes,
        paymentLinks,
      },
    }
  } catch (err) {
    return {
      props: {
        paymentModes: [],
        paymentLinks: [],
      },
    }
  }
}
