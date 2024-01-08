import { Brand } from "./utility"

// TODO - this is temporary we have to remove this
export type UploadedDocumentType = Brand<string, "DocumentType">

export type PageServerSideProps<T extends (...args: any) => any> = Awaited<ReturnType<T>>["props"]
