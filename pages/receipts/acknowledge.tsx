import { Table } from "@radix-ui/themes"
import Head from "next/head"
import * as React from "react"
import {
  AppDetail,
  Button,
  Divider,
  ErrorMessage,
  Heading,
  ImageIcon,
  Page,
  SelectInput,
  SeparatorLayout,
  Stack,
  TextInput,
} from "components"

import { RequestStatus } from "enums"
import { API } from "service"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { ApplicationState } from "store/slices/application"
import { receiptAction, ReceiptState } from "store/slices/receipts"
import { acknowledgeReceipts } from "store/slices/receipts/async-actions"
import { PageServerSideProps } from "types"

export default function Receipt(props: PageServerSideProps<typeof getServerSideProps>) {
  const { application } = useAppSelector<ApplicationState>((state) => state.application)
  const dispatch = useAppDispatch()

  const { receipts, invalidFields } = useAppSelector<ReceiptState>((state) => state.receipt)

  const initialReceipts = React.useMemo(
    () =>
      props.receipts.map((r) => ({
        ...r,
        transactionId: "",
        status: null,
      })),
    [props.receipts]
  )

  React.useEffect(() => {
    dispatch(receiptAction.setReceipts(initialReceipts))
  }, [initialReceipts, dispatch])

  return (
    <Page>
      <Head>
        <title>Acknowledge Receipt</title>
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
          <div className="mb-8 flex flex-row items-center justify-between border-b-2 border-b-primary pb-4">
            <Heading className=" underline" size={"xl"}>
              Acknowledge Receipt
            </Heading>
          </div>

          <div>
            <Table.Root className="table-full mt-6 table-fixed bg-green-400" size="3" variant="surface">
              <Table.Header>
                <Table.Row className="text-center" style={{ color: "var(--primary)" }}>
                  <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>APP ID</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Mode</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Transaction ID</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {receipts.map((receipt) => {
                  const invalidField = invalidFields.receipts.find((r) => receipt.id === r.id)

                  return (
                    <Table.Row className="text-center" key={receipt.id}>
                      <Table.Cell>{receipt.date}</Table.Cell>
                      <Table.Cell>{receipt.applicationId}</Table.Cell>
                      <Table.Cell>{receipt.amount}</Table.Cell>
                      <Table.Cell>{receipt.paymentMode}</Table.Cell>
                      <Table.Cell>
                        <div className="flex flex-col gap-3">
                          <TextInput
                            className="rounded-md border border-muted-gray"
                            value={receipt.transactionId}
                            onChange={(e) =>
                              dispatch(
                                receiptAction.setReceiptTransactionIdById({
                                  transactionId: e.target.value,
                                  receiptId: receipt.id,
                                })
                              )
                            }
                          />
                          <ErrorMessage isInvalid={Boolean(invalidField && invalidField.transactionId.isInvalid)}>
                            {invalidField && invalidField["transactionId"].errorMessage}
                          </ErrorMessage>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex flex-col gap-3">
                          <SelectInput
                            options={[
                              { id: "1", title: RequestStatus.Approve, value: "approved" },
                              { id: "2", title: RequestStatus.Reject, value: "rejected" },
                            ]}
                            value={receipt.status ?? ""}
                            title="Select Status"
                            onChange={(e) =>
                              dispatch(
                                receiptAction.setReceiptStatusById({
                                  status: e.target.value as RequestStatus,
                                  receiptId: receipt.id,
                                })
                              )
                            }
                          />
                          <ErrorMessage isInvalid={Boolean(invalidField && invalidField.status.isInvalid)}>
                            {invalidField && invalidField["status"].errorMessage}
                          </ErrorMessage>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table.Root>
            {receipts.length === 0 && (
              <p className="-mt-1 rounded-md border border-t-0 py-3 text-center font-semibold">No Receipts found.</p>
            )}
          </div>
          <Stack direction="row" className="mx-auto mt-8 w-fit">
            <Button
              onClick={() => {
                dispatch(acknowledgeReceipts())
              }}
            >
              Submit
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                dispatch(receiptAction.setReceipts(initialReceipts))
              }}
            >
              Cancel
            </Button>
          </Stack>
        </div>
      </SeparatorLayout>
    </Page>
  )
}

export const getServerSideProps = async () => {
  try {
    const {
      data: { receipts },
    } = await API.getReceipts()
    return { props: { receipts } }
  } catch (err) {
    return {
      props: {
        receipts: [],
      },
    }
  }
}
