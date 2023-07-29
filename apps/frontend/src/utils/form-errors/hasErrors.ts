import { FormikErrors } from 'formik'

type Fields = { [key: string]: string }

export const hasErrors = (errors: FormikErrors<Fields>): boolean =>
  Object.values(errors).some(error => Boolean(error))
