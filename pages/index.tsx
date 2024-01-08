import Head from "next/head"

import { Page, Stack } from "components"
import {
  CasePenetration,
  Heading,
  Incentive,
  Resolution,
  ScheduledPromiseToPay,
  TargetVsAchieved,
  TopPerformers,
} from "components/Daskboard"
import { PriorityBucket } from "enums"

export default function Web() {
  return (
    <>
      <Head>
        <meta property="og:url" content="" />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/Blazity/next-enterprise/main/project-logo.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <title>En Collect</title>
      </Head>
      <Page className="mx-auto gap-6 p-6">
        <Stack>
          <Heading className="underline">My Performance</Heading>
          <Resolution
            resolutionRate={12}
            resolutions={[
              {
                priority: PriorityBucket.P2,
                id: "12",
                allocatedCases: 20,
                pBal: "12 Lak",
                resolution: 12,
                resolutionValue: 30000,
              },
              {
                priority: PriorityBucket.P2,
                id: "11",
                allocatedCases: 20,
                pBal: "12 Lak",
                resolution: 12,
                resolutionValue: 30000,
              },
            ]}
          />
          <Incentive value={20000} />
        </Stack>
        <Stack>
          <CasePenetration allocatedAccounts={100} connectedAccounts={75} />
          <ScheduledPromiseToPay totalPTP={5} weekPTP={16} monthPTP={16} todaysPTP={16} brokenPTP={16} />
        </Stack>
        <Stack>
          <TargetVsAchieved achieved={35} target={100} />
          <TopPerformers
            data={[
              { id: 1, name: "Saumya Mutalik", score: 95 },
              { id: 2, name: "Suresh kumar", score: 81 },
              { id: 3, name: "Suraj Mohanty", score: 78 },
              { id: 4, name: "Sarvesh Digraje", score: 66 },
              { id: 5, name: "Aditya Desai", score: 59 },
            ]}
          />
        </Stack>
      </Page>
    </>
  )
}
