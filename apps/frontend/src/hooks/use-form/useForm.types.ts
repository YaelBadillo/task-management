import { FormikErrors, FormikTouched, FormikValues } from 'formik'

export interface UseFormProperties<D> {
  url: string
  initialValues: D
  withCredentials?: boolean
  validate?: (values: D) => void | object | Promise<FormikErrors<D>>
  initialTouched?: FormikTouched<D>
}

export type Fields<Values extends FormikValues> = {
  [K in keyof Values]: {
    value: Values[K]
    error: FormikErrors<Values>[K]
    touched: FormikTouched<Values>[K]
  }
}

export interface FormProps<D> {
  values: D
  errors: FormikErrors<D>
  touched: FormikTouched<D>
}
