import Head from "next/head"

import React, { useCallback, useState } from "react"
import { AllocationLayout, Button, Heading, Stack } from "components"
import UploadFile from "components/UploadFile/UploadFile"
import { useAppDispatch } from "store/hooks"
import { bulkUpload } from "store/slices/allocation/async-action"

export default function BulkUpload() {
  const [allocationFile, setAllocationFile] = useState<File | null>(null)

  const dispatch = useAppDispatch()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setAllocationFile(acceptedFiles[0])
  }, [])

  return (
    <AllocationLayout>
      <Head>
        <title>Allocation | Bulk-upload</title>
      </Head>
      <div className="flex flex-row items-center justify-between border-b-2 border-b-primary pb-4">
        <Heading className="text-muted-gray underline" size={"xl"}>
          Bulk upload- Allocation file
        </Heading>
        <Button variant={"link"} className="text-base text-link-blue underline">
          Download template for allocation
        </Button>
      </div>

      <div className="m-auto mt-10 max-w-[80%] px-9">
        <Heading>Upload collector allocation file:</Heading>
        <div className="mt-4 overflow-hidden rounded-md border border-muted-gray p-8">
          <UploadFile onDrop={onDrop} />
          <p className="my-10 text-center font-bold text-primary underline">{allocationFile?.name}</p>
          <Stack direction="row" className="mx-auto mt-8 w-fit">
            <Button
              disabled={!allocationFile}
              onClick={() => {
                if (!allocationFile) return
                dispatch(bulkUpload({ allocationFile: allocationFile }))
              }}
            >
              Upload
            </Button>
            <Button variant="secondary" onClick={() => setAllocationFile(null)}>
              Cancel
            </Button>
          </Stack>
        </div>
      </div>
    </AllocationLayout>
  )
}
