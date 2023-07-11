import axios, { AxiosError, AxiosResponse, Method } from 'axios'

interface ErrorResponse {
  status: number
  message: string
  path?: string
}

export const fetchData = async <T, D = object>(
  url: string,
  method: Method,
  body: D,
  withCredentials: boolean,
): Promise<T> => {
  try {
    const response = await axios<T, AxiosResponse<T, D>, D>(url, {
      data: body,
      method,
      withCredentials,
    })

    return response.data
  } catch (error: unknown) {
    if (error instanceof AxiosError) handleError(error)
  }

  throw new Error('Unexpected error.')
}

const handleError = (error: AxiosError<ErrorResponse>) => {
  if (error.response) throw new Error(error.response?.data.message)

  if (error.request) throw new Error(error.request)

  throw new Error(error.message)
}
