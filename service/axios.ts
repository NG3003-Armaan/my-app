import Axios, { AxiosError } from "axios"

Axios.defaults.headers.post["Content-Type"] = "application/json"

const axiosInstance = Axios.create({
  timeout: 1000 * 60, // 60 seconds
})

type ErrorStatus = "invalidResponse"

export type AxiosResponseError = {
  status: ErrorStatus
  errors: {
    message: string
  }
}

axiosInstance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error: AxiosError) {
    const response = error.response

    const data = response?.data as AxiosResponseError

    // TODO - convert the error here to usable format
    return Promise.reject(data)
  }
)

export default axiosInstance
