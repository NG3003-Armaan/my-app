import clsx from "clsx"

import React, { useCallback } from "react"
import { FileRejection, useDropzone } from "react-dropzone"
import { toast } from "react-hot-toast"
import { Button, Icon } from "components"

interface UploadFileProps {
  onDrop: (acceptedFiles: File[]) => void
}

export default function UploadFile({ onDrop }: UploadFileProps) {
  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    fileRejections.forEach((rejection) => {
      rejection.errors.forEach((error) => {
        toast.error(error.message)
      })
    })
  }, [])

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    noClick: true,
    accept: {
      "text/csv": [".csv", ".doc", ".docx", ".xlsx"],
    },
    maxFiles: 1,
  })

  return (
    <div
      {...getRootProps()}
      className={clsx("rounded-md border border-dashed border-primary text-center", {
        "bg-lime-50": isDragActive,
      })}
    >
      <input {...getInputProps()} />
      <div className="p-6">
        <Icon name="upload" className="m-auto mb-4" />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <div>
            Drag and drop or{" "}
            <Button variant={"link"} className="p-0 text-base text-link-blue underline" onClick={open}>
              Browse file{" "}
            </Button>{" "}
            to upload
          </div>
        )}
      </div>
    </div>
  )
}
