import React, { useCallback, useState } from "react"
import { Button, Heading, ImageIcon, Stack } from "components"
import { LitigationLayout } from "components/Litigation"
import UploadFile from "components/UploadFile/UploadFile"
import { useAppDispatch } from "store/hooks"
import { uploadCaseStatus } from "store/slices/litigation/async-action"

export default function UploadCaseStatus() {
  const [caseStatusFile, setCaseStatusFile] = useState<File | null>(null)
  const dispatch = useAppDispatch()

  const uploadFile = useCallback((acceptedFiles: File[]) => {
    setCaseStatusFile(acceptedFiles[0])
  }, [])

  return (
    <LitigationLayout screen="Legal-status" iconName="status" title="Status">
      <Stack className="flex w-full flex-col">
        <div className="flex flex-row justify-between border-b-2 border-b-primary pb-4">
          <Heading className="text-muted-gray underline">Case Status Upload - Legal file</Heading>
          <span className="flex">
            <Button variant={"link"} className="text-md justify-items-end px-2 text-blue-500 underline">
              Download legal file template
            </Button>
            <ImageIcon name="download" className="m-auto mb-2 w-8 px-1" />
          </span>
        </div>
        <div className="m-auto mt-10 w-full max-w-[80%] px-9">
          <UploadFile onDrop={uploadFile}></UploadFile>
          <p className="my-10 text-center font-bold text-primary underline">{caseStatusFile?.name}</p>
        </div>
        <Stack direction="row" className="mx-auto mt-8 w-fit">
          <Button
            disabled={!caseStatusFile}
            onClick={() => {
              if (!caseStatusFile) return

              dispatch(uploadCaseStatus({ statusFile: caseStatusFile }))
            }}
          >
            Upload
          </Button>
          <Button variant={"secondary"} onClick={() => setCaseStatusFile(null)}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </LitigationLayout>
  )
}
