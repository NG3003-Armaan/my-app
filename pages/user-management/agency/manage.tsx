import clsx from "clsx"
import _ from "lodash"
import Head from "next/head"
import * as React from "react"
import Select from "react-select"

import { Button, Divider, Heading, SelectInput, Stack, UserManagementLayout } from "components"
import { activityStatuses } from "data"
import { ActivityStatus } from "enums"
import { API } from "service"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { agencyAction, type AgencyState } from "store/slices/user-management/agency"
import { updateAgencyStatus } from "store/slices/user-management/agency/async-actions"
import { PageServerSideProps } from "types"

export default function ManageAgency(props: PageServerSideProps<typeof getServerSideProps>) {
  const { searchQuery, searchedAgency } = useAppSelector<AgencyState>((state) => state.agency)

  const { agencies } = props

  const dispatch = useAppDispatch()

  const agency = agencies.find((a) => a.id === searchQuery?.value)

  React.useEffect(() => {
    if (agency) dispatch(agencyAction.setSearchedAgency(agency))
  }, [searchQuery])

  return (
    <UserManagementLayout>
      <Head>
        <title>Manage | Agency</title>
      </Head>
      <div>
        <div className="flex items-center justify-between">
          <Heading>Manage Agency</Heading>
          <div>
            <Select
              instanceId="long-value-select"
              options={agencies.map((agency) => ({ value: agency.id, label: agency.agencyName }))}
              onChange={(e) => dispatch(agencyAction.setSearchQuery(e as { value: number; label: string }))}
              value={searchQuery}
              isClearable
              className="react-select-container w-full"
              placeholder="Search Agency Name"
              classNames={{
                control: ({ isFocused }) =>
                  clsx("!shadow-none p-1 !rounded-md", {
                    "!border-primary !border-2": isFocused,
                  }),
                option: ({ isFocused }) =>
                  clsx("", {
                    "!bg-primary !text-white": isFocused,
                  }),
              }}
            />
          </div>
        </div>
        <div className="mt-6 border py-3">
          <div className="flex items-center px-3 text-primary">
            <div className="flex-[0.25]">Agency Name</div>
            <div className="flex-[0.25]">Agency Code</div>
            <div className="flex-[0.25]">Renew Contract</div>
            <div className="flex-[0.25]">Activity Status</div>
          </div>
          <Divider />
          {searchQuery && searchedAgency ? (
            <Stack className="px-3">
              <div className="flex items-center gap-1">
                <div className="flex-[0.25]">{searchedAgency.agencyName}</div>
                <div className="flex-[0.25]">{searchedAgency.id}</div>
                <div className="flex-[0.25]">{searchedAgency.renewalContract}</div>
                <div className="flex-[0.25]">
                  <SelectInput
                    options={activityStatuses}
                    value={searchedAgency.status}
                    title="Select Activity Status"
                    onChange={(e) =>
                      dispatch(
                        agencyAction.setSearchedAgencyStatus({
                          activityStatus: e.target.value as ActivityStatus,
                        })
                      )
                    }
                  />
                </div>
              </div>
            </Stack>
          ) : (
            <p className="p-3 text-center">Search result found here.</p>
          )}
        </div>

        <Stack direction="row" className="mx-auto mt-8 w-fit">
          <Button
            onClick={() => {
              dispatch(updateAgencyStatus({ changedAgencyStatus: agency?.status !== searchedAgency?.status }))
            }}
          >
            Submit
          </Button>
          <Button variant="secondary" onClick={() => dispatch(agencyAction.resetSearchResult())}>
            Cancel
          </Button>
        </Stack>
      </div>
    </UserManagementLayout>
  )
}

export const getServerSideProps = async () => {
  try {
    const { data } = await API.getAgencies()
    return { props: { agencies: data ?? [] } }
  } catch (error) {
    return { props: { agencies: [] } }
  }
}
