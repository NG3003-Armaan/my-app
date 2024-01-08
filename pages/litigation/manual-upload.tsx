import { Heading } from "@radix-ui/themes"
import React, { useCallback, useState } from "react"
import { Button, SeparatorLayout, Stack } from "components"
import LitigationLayout from "components/Litigation/LitigationLayout"
import UploadFile from "components/UploadFile/UploadFile"
import { useAppDispatch } from "store/hooks"
import { bulkUpload } from "store/slices/litigation/async-action"

export default function ManualUpload() {
  const [litigationFile, setLitigationFile] = useState<File | null>(null)

  const dispatch = useAppDispatch()

  const uploadFile = useCallback((acceptedFiles: File[]) => {
    setLitigationFile(acceptedFiles[0])
  }, [])
  return (
    <LitigationLayout iconName="litigation" title="litigation" screen="">
      <SeparatorLayout>
        <Stack>
          <div className="flex flex-row items-center justify-between border-b-2 border-b-primary pb-4">
            <Heading className="text-md  mr-2 px-5 font-light text-muted-gray underline">
              Bulk Upload Litigation File
            </Heading>
            <Button variant={"link"} className="text-base text-link-blue underline">
              Download template for Litigation
            </Button>
          </div>
          <div className="m-auto mt-10 w-full max-w-[80%] px-9">
            <UploadFile onDrop={uploadFile} />
            <p className="my-10 text-center font-bold text-primary underline">{litigationFile?.name}</p>
            <Stack direction="row" className="mx-auto mt-8 w-fit">
              <Button
                disabled={!litigationFile}
                onClick={() => {
                  if (!litigationFile) return
                  dispatch(bulkUpload({ litigationFile: litigationFile }))
                }}
              >
                Upload
              </Button>
              <Button variant="secondary" onClick={() => setLitigationFile(null)}>
                Cancel
              </Button>
            </Stack>
          </div>
        </Stack>
      </SeparatorLayout>
    </LitigationLayout>
  )
}
