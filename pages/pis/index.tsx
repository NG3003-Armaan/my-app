import React from "react"
import { Page, Stack } from "components"
import { Heading, LocationWisePis, PisAcknowledgementStatus, PisPenetration } from "components/Pis"
import { API } from "service"
import { PageServerSideProps } from "types"

export default function Pis(props: PageServerSideProps<typeof getServerSideProps>) {
  const { pisPenetration, dateRangeWise, statusWise, locationWise } = props.pisDashboardData

  return (
    <Page navLinks="pis" className="mx-auto gap-16 p-6">
      <Stack>
        <Heading className="underline">PIS Dashboard</Heading>
        <PisPenetration
          totalPis={pisPenetration.total}
          pisAcknowledged={pisPenetration.acknowledged}
          pendingPis={pisPenetration.pending}
        />
      </Stack>
      <Stack>
        <PisAcknowledgementStatus
          todaysPIS={dateRangeWise.today}
          weekPIS={dateRangeWise.weekly}
          monthPIS={dateRangeWise.monthly}
          matchedPIS={statusWise.matched}
          mismatchedPIS={statusWise.misMatched}
        />
      </Stack>
      <Stack>
        <LocationWisePis data={locationWise} />
      </Stack>
    </Page>
  )
}

export const getServerSideProps = async () => {
  try {
    const { data: pisDashboardData } = await API.getPisDashboardData()

    return {
      props: {
        pisDashboardData,
      },
    }
  } catch (err) {
    return {
      props: {
        pisDashboardData: {
          pisPenetration: {
            total: 0,
            acknowledged: 0,
            pending: 0,
          },
          dateRangeWise: {
            today: 0,
            weekly: 0,
            monthly: 0,
          },
          statusWise: {
            matched: 0,
            misMatched: 0,
          },
          locationWise: [],
        },
      },
    }
  }
}
