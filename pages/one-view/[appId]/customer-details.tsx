import { Stack } from "components"
import OneViewLayout from "components/OneView/OneViewLayout"
import { API } from "service"
import { PageServerSideProps } from "types"

export default function CustomerDetails(props: PageServerSideProps<typeof getServerSideProps>) {
  const { customerDetails } = props

  return (
    <OneViewLayout>
      <div className="rounded-md border">
        <Stack>
          {customerDetails && (
            <div className="flex flex-col rounded px-6 py-5">
              <div className="flex border-b px-4 py-3">
                <p className="flex-[0.4]">Name</p>
                <p className="flex-[0.6] font-medium">{`${customerDetails.firstName} ${customerDetails.lastName}`}</p>
              </div>
              <div className="flex border-b px-4 py-3">
                <p className="flex-[0.4]">Product</p>
                <p className="flex-[0.6] font-medium">{customerDetails.product}</p>
              </div>
              <div className="flex border-b px-4 py-3">
                <p className="flex-[0.4]">Region</p>
                <p className="flex-[0.6] font-medium">{customerDetails.region}</p>
              </div>
              <div className="flex border-b px-4 py-3">
                <p className="flex-[0.4]">City</p>
                <p className="flex-[0.6] font-medium">{customerDetails.city}</p>
              </div>
              <div className="flex border-b px-4 py-3">
                <p className="flex-[0.4]">State</p>
                <p className="flex-[0.6] font-medium">{customerDetails.state}</p>
              </div>
              <div className="flex border-b px-4 py-3">
                <p className="flex-[0.4]">Mobile</p>
                <p className="flex-[0.6] font-medium">{customerDetails.mobile}</p>
              </div>
              <div className="flex border-b px-4 py-3">
                <p className="flex-[0.4]">Residential Pincode</p>
                <p className="flex-[0.6] font-medium">{customerDetails.residential.pincode}</p>
              </div>
              <div className="flex border-b px-4 py-3">
                <p className="flex-[0.4]">Residential Address</p>
                <p className="flex-[0.6] font-medium">{customerDetails.residential.address}</p>
              </div>
              <div className="flex border-b px-4 py-3">
                <p className="flex-[0.4]">Bussiness Pincode</p>
                <p className="flex-[0.6] font-medium">{customerDetails.business.pincode}</p>
              </div>
              <div className="flex border-b px-4 py-3">
                <p className="flex-[0.4]">Bussiness Address</p>
                <p className="flex-[0.6] font-medium">{customerDetails.business.address}</p>
              </div>
            </div>
          )}
        </Stack>
      </div>
    </OneViewLayout>
  )
}

export async function getServerSideProps() {
  try {
    const {
      data: { customerDetails },
    } = await API.fetchCustomerDetails(1108598)

    return {
      props: {
        customerDetails,
      },
    }
  } catch (error) {
    return {
      props: {
        customerDetails: null,
      },
    }
  }
}
