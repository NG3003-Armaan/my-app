import { rest } from "msw"
import { urls } from "service/urls"

export const handlers = [
  rest.get(urls.GET_RECEIPTS, (_req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          receipts: [
            {
              id: 4,
              date: "20/11/2023",
              amount: "65778.54",
              payment_mode: "Cheque",
              txn_id: "237849kjasddasd",
              application_id: null,
            },
            {
              id: 5,
              date: "20/11/2023",
              amount: "65778.54",
              payment_mode: "Cheque",
              txn_id: "98560lkwlkjasflnal",
              application_id: null,
            },
            {
              id: 6,
              date: "20/11/2023",
              amount: "65778.54",
              payment_mode: "Cheque",
              txn_id: "a2lksadjfkajdfds",
              application_id: null,
            },
          ],
        },
      })
    )
  }),
  rest.post(urls.GET_APPLICATION, (_req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          appId: "1107280",
          customerId: "98678",
          firstName: "Suraj",
          lastName: "Mohanty",
          dpdBucket: "0-29 days",
          overDueAmount: "Rs. 60,000",
          loanAmount: "Rs. 15,00,000",
          pBal: "Rs. 9,45,000",
        },
      })
    )
  }),
  rest.post(urls.ACKNOWLEDGE_RECEIPTS, (_req, res, ctx) => {
    return res(
      ctx.json({
        msg: "Receipts acknowledged",
      })
    )
  }),
  rest.post(urls.CREATE_RECEIPT, (_req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          receipt_id: 8,
        },
        msg: "Receipt created",
      })
    )
  }),
  rest.get(urls.RECEIPTS_MASTER_DATA, (_req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          payment_modes: [
            {
              id: 1,
              value: "Cash",
            },
            {
              id: 2,
              value: "Online",
            },
            {
              id: 3,
              value: "Cheque",
            },
            {
              id: 4,
              value: "DD",
            },
          ],
        },
      })
    )
  }),
]
