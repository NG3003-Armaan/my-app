import clsx from "clsx"
import Head from "next/head"
import { AppDetail, Divider, Heading, ImageIcon, Page, SeparatorLayout } from "components"
import { SettlementInfo } from "components/Settlement"
import { API } from "service"
import { useAppSelector } from "store/hooks"
import { ApplicationState } from "store/slices/application"
import { PageServerSideProps } from "types"

export default function SettlementInformation(props: PageServerSideProps<typeof getServerSideProps>) {
  const { application } = useAppSelector<ApplicationState>((state) => state.application)

  const { settlementInfo } = props

  return (
    <Page>
      <Head>
        <title>Settlement Information</title>
      </Head>
      <SeparatorLayout>
        <div className="relative w-1/6 min-w-[320px]">
          <div className="sticky top-3 py-3 text-center">
            <ImageIcon name="settlement" className="m-auto mb-2 w-10" />
            <Heading as="h4" size="md" className="font-semibold text-primary underline">
              Settlement
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
                Settlement Information
              </Heading>
            </div>
            <div className="ml-16 max-w-[800px]">
              <SettlementInfo {...settlementInfo} />
            </div>
          </div>
        </div>
      </SeparatorLayout>
    </Page>
  )
}

export async function getServerSideProps() {
  try {
    const { data: settlementInfo } = await API.getSettlementInfo(1)

    return {
      props: {
        settlementInfo,
      },
    }
  } catch (err) {
    return {
      props: {
        settlementInfo: {
          settlementAmount: 0,
          settlementType: "",
          deferredAmount: 0,
          settlementStartDate: "",
          paymentMode: "",
          paymentFrequency: 0,
          paymentDates: [],
          wavier: "",
          asRemarks: "",
          settlementDocuments: [],
        },
      },
    }
  }
}
