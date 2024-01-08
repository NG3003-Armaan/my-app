import clsx from "clsx"
import Head from "next/head"
import { AppDetail, Button, Divider, Heading, ImageIcon, Page, SeparatorLayout, Stack } from "components"

import BasicInformation from "components/TrailUpdate/BasicInformation"
import SecondaryInformation from "components/TrailUpdate/SecondaryInformation"
import { API } from "service"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { ApplicationState } from "store/slices/application"
import { trailAction } from "store/slices/trail"
import { createTrail } from "store/slices/trail/async-actions"
import { PageServerSideProps } from "types"

export default function Trail(props: PageServerSideProps<typeof getServerSideProps>) {
  const { application } = useAppSelector<ApplicationState>((state) => state.application)

  const disabled = !application.appId
  const dispatch = useAppDispatch()

  return (
    <Page>
      <Head>
        <title>Trail Update</title>
      </Head>
      <SeparatorLayout>
        <div className="relative w-1/6 min-w-[320px]">
          <div className="sticky top-3 py-3 text-center">
            <ImageIcon name="trail_update" className="m-auto mb-2 w-10" />
            <Heading as="h4" size="md" className="font-semibold text-primary underline">
              Trail Update
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
            <BasicInformation disabled={false} masterData={props.trailsMasterData} />
            <SecondaryInformation disabled={disabled} />
            <Stack direction="row" className="mx-auto mt-8 w-fit">
              <Button onClick={() => dispatch(createTrail())} disabled={disabled}>
                Submit
              </Button>
              <Button variant="secondary" onClick={() => dispatch(trailAction.resetTrailFields())}>
                Cancel
              </Button>
            </Stack>
          </div>
        </div>
      </SeparatorLayout>
    </Page>
  )
}

export const getServerSideProps = async () => {
  try {
    const { data: trailsMasterData } = await API.getTrailsMasterData()
    const { data: settlementTypes } = await API.getSettlementTypes()

    return {
      props: {
        trailsMasterData: { ...trailsMasterData, settlementTypes },
      },
    }
  } catch (err) {
    return {
      props: {
        trailsMasterData: {
          connectivity: [],
          trailType: [],
          nextAction: [],
          reasonForNonPayment: [],
          dispositions: [],
          settlementTypes: [],
        },
      },
    }
  }
}
