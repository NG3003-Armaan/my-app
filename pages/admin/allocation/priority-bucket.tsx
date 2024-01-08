import { Table } from "@radix-ui/themes"
import { useState } from "react"
import { Heading, Icon, Modal } from "components"
import AdminAllocationLayout from "components/Admin/Allocation/AdminAllocationLayout"
import BucketModal from "components/Admin/Allocation/BucketModal"

type Logic =
  | {
      type: "with_range"
      value: {
        min: number
        max: number
      }
    }
  | {
      type: "endless"
      value: number
    }

type Bucket = {
  bucketName: string
  logic_30: Logic
  logic_31: Logic
}

const priorityBuckets: Array<Bucket> = [
  {
    bucketName: "P1 A",
    logic_30: {
      type: "with_range",
      value: {
        min: 50,
        max: 59,
      },
    },
    logic_31: {
      type: "with_range",
      value: {
        min: 49,
        max: 58,
      },
    },
  },
  {
    bucketName: "P1 B",
    logic_30: {
      type: "with_range",
      value: {
        min: 60,
        max: 89,
      },
    },
    logic_31: {
      type: "with_range",
      value: {
        min: 59,
        max: 89,
      },
    },
  },
  {
    bucketName: "P3 ",
    logic_30: {
      type: "endless",
      value: 239,
    },
    logic_31: {
      type: "endless",
      value: 239,
    },
  },
]

const EndLessComp = ({ logic }: { logic: Logic }) => {
  return <>DPD {logic.value}+</>
}

const WithRangeComp = ({ logic }: { logic: Logic }) => {
  if (logic.type !== "with_range") return
  return (
    <>
      {" "}
      DPD {logic.value.min} - {logic.value.max}
    </>
  )
}

export default function PriorityBucket() {
  const [bucketOpen, setBucketOpen] = useState(false)

  return (
    <AdminAllocationLayout>
      <Heading className="text-primary underline">Priority bucket for NeoCash product:</Heading>
      <div className="relative px-4">
        <Table.Root className="mt-6 bg-green-400" size="3" variant="surface">
          <Table.Header>
            <Table.Row className="text-center" style={{ color: "var(--primary)" }}>
              <Table.ColumnHeaderCell>Priorities</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Logic 1- 30 days</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Logic 2- 31 days</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {priorityBuckets.length > 0 &&
              priorityBuckets.map((priorityBucket) => {
                const { logic_30, logic_31 } = priorityBucket

                return (
                  <Table.Row
                    className="cursor-pointer py-2 text-center"
                    key={priorityBucket.bucketName}
                    onClick={() => setBucketOpen(true)}
                  >
                    <Table.Cell>{priorityBucket.bucketName}</Table.Cell>
                    {logic_30.type === "endless" && (
                      <Table.Cell>
                        {" "}
                        <EndLessComp logic={logic_30} />
                      </Table.Cell>
                    )}
                    {logic_31.type === "endless" && (
                      <Table.Cell>
                        {" "}
                        <EndLessComp logic={logic_31} />
                      </Table.Cell>
                    )}
                    {logic_30.type === "with_range" && (
                      <Table.Cell>
                        <WithRangeComp logic={logic_30} />
                      </Table.Cell>
                    )}
                    {logic_31.type === "with_range" && (
                      <Table.Cell>
                        <WithRangeComp logic={logic_31} />
                      </Table.Cell>
                    )}
                  </Table.Row>
                )
              })}
          </Table.Body>
        </Table.Root>
        <div
          className="absolute -bottom-3 -left-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-[100%] bg-primary"
          onClick={() => setBucketOpen(true)}
        >
          <Icon name="plus" className="text-white" />
        </div>
      </div>
      <Modal isOpen={bucketOpen} onOpenChange={() => setBucketOpen(!bucketOpen)}>
        <BucketModal />
      </Modal>
    </AdminAllocationLayout>
  )
}
