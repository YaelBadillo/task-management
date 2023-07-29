import axios, { AxiosError, AxiosResponse, Method } from 'axios'
import { HttpException } from 'shared'

interface ErrorResponse {
  status: number
  message: string
  path?: string
}

export const fetchData = async <T, D>(
  url: string,
  method: Method,
  body?: D,
  withCredentials = false,
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
  if (error.response) {
    const { status, message, path } = error.response.data
    if (error.response.data.path) {
      throw new HttpException(status, message, path)
    }

    throw new Error(message)
  }

  if (error.request) throw new Error(error.request)

  throw new Error(error.message)
}
