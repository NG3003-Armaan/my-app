import { Heading, Table, Text } from "@radix-ui/themes"
import React, { useEffect } from "react"
import PisLayout from "components/Pis/PisLayout"
import { API } from "service"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { pisActions, PisState } from "store/slices/pis"
import { PageServerSideProps } from "types"

export default function ManualAcknowledgePis(props: PageServerSideProps<typeof getServerSideProps>) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(pisActions.setManualAcknowledgePis(props.manualAcknowledgePis))
  }, [props])

  const { manualAcknowledgePis } = useAppSelector<PisState>((state) => state.pis)
  return (
    <PisLayout type="manualChecker">
      <div className="flex flex-row items-center justify-between">
        <Heading className="text-muted-gray underline">
          Click on download output to download manual acknowledged PIS XLMS file:
        </Heading>
        <Text className="text-blue-500 underline">Download Output</Text>
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
              <Table.ColumnHeaderCell>Manual Ack User</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {manualAcknowledgePis.map((output) => {
              return (
                <Table.Row key={output.applicationId} className="text-center">
                  <Table.Cell>{output.applicationId}</Table.Cell>
                  <Table.Cell>{output.date}</Table.Cell>
                  <Table.Cell>{output.amount}</Table.Cell>
                  <Table.Cell>{output.transactionId}</Table.Cell>
                  <Table.Cell>{output.paymentMode} </Table.Cell>
                  <Table.Cell>{output.acknowledgementUser} </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table.Root>
      </div>
    </PisLayout>
  )
}

export const getServerSideProps = async () => {
  try {
    const {
      data: { manualAcknowledgePis },
    } = await API.getManualAcknowledgedPis()

    return {
      props: {
        manualAcknowledgePis,
      },
    }
  } catch (err) {
    return {
      props: {
        manualAcknowledgePis: [],
      },
    }
  }
}
