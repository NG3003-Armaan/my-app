import { Heading, Table } from "@radix-ui/themes"
import React, { useEffect } from "react"
import { Button, SelectInput, Stack } from "components"
import PisLayout from "components/Pis/PisLayout"
import { API } from "service"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { pisActions, PisState } from "store/slices/pis"
import { submitMisMatchedPis } from "store/slices/pis/async-actions"
import { PageServerSideProps } from "types"

export default function ManualChecker(props: PageServerSideProps<typeof getServerSideProps>) {
  useEffect(() => {
    dispatch(pisActions.setMisMatchedPis(props.misMatchedPis))
  }, [props])

  const { misMatchedPis: misMatchedData } = useAppSelector<PisState>((state) => state.pis)

  const dispatch = useAppDispatch()

  return (
    <PisLayout type="manualChecker">
      <div className="flex flex-row items-center justify-between">
        <Heading className="text-muted-gray underline">Click on submit to acknowledge PIS:</Heading>
      </div>
      <div className="mt-5 ">
        <Table.Root className="ng-stickyTable mt-6 bg-green-400" size="3" variant="surface">
          <Table.Header>
            <Table.Row className="text-center" style={{ color: "var(--primary)" }}>
              <Table.ColumnHeaderCell>APP ID</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Receipt Date</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Receipt Amount</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>TXN ID</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Mode</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {misMatchedData.map((output) => {
              return (
                <Table.Row key={output.applicationId} className="text-center">
                  <Table.Cell>{output.applicationId}</Table.Cell>
                  <Table.Cell>{output.date}</Table.Cell>
                  <Table.Cell>{output.amount}</Table.Cell>
                  <Table.Cell>{output.transactionId}</Table.Cell>
                  <Table.Cell>{output.paymentMode} </Table.Cell>
                  <Table.RowHeaderCell>
                    <div className="relative space-y-2">
                      {/* <SelectInput title="select" options={processMasterData(sendToCmReasonsMasterData)} /> */}
                      <SelectInput
                        title="select"
                        defaultValue={output.action}
                        onChange={(e) => {
                          dispatch(pisActions.setSelectedAction({ id: output.id, value: e.target.value }))
                        }}
                        options={props.misMatchedProcessMasterData}
                      />
                      {output.action === "sent_to_cm" && (
                        <SelectInput
                          title="select"
                          defaultValue={output.sendToCmReason}
                          onChange={(e) => {
                            dispatch(
                              pisActions.setSelectedReason({
                                id: output.id,
                                value: e.target.value,
                              })
                            )
                          }}
                          options={props.sendToCmReasonsMasterData}
                        />
                      )}
                    </div>
                  </Table.RowHeaderCell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table.Root>
        <Stack direction="row">
          <Button className="mt-6" onClick={() => dispatch(submitMisMatchedPis(props.misMatchedPis))}>
            Submit
          </Button>
          <Button className="mt-6 bg-muted-gray">Cancel</Button>
        </Stack>
      </div>
    </PisLayout>
  )
}

export const getServerSideProps = async () => {
  try {
    const {
      data: { misMatchedPis, sendToCmReasonsMasterData, misMatchedProcessMasterData },
    } = await API.getMismatchedPis()

    return {
      props: {
        misMatchedPis,
        sendToCmReasonsMasterData,
        misMatchedProcessMasterData,
      },
    }
  } catch (err) {
    return {
      props: {
        misMatchedPis: [],
        sendToCmReasonsMasterData: [],
        misMatchedProcessMasterData: [],
      },
    }
  }
}
