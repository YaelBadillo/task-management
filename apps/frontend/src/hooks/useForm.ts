import { useFormik, FormikValues, FormikErrors, FormikTouched } from 'formik'

import { useFetch } from '@hooks'
import { useMemo } from 'react'
import { hasErrors } from '@utils/form-errors'

interface UseFormProperties<D> {
  url: string
  initialValues: D
  withCredentials?: boolean
  validate?: (values: D) => void | object | Promise<FormikErrors<D>>
  initialTouched?: FormikTouched<D>
}

type Fields<Values extends FormikValues> = {
  [K in keyof Values]: {
    value: Values[K]
    error: FormikErrors<Values>[K]
    touched: FormikTouched<Values>[K]
  }
}

export const useForm = <D extends FormikValues, T = object>({
  url,
  initialValues,
  withCredentials,
  validate,
  initialTouched,
}: UseFormProperties<D>) => {
  const formik = useFormik<D>({
    initialValues,
    onSubmit: () => {
      execute()
    },
    validate,
    initialTouched,
  })

  const method = 'post'
  const { execute, status, value, error } = useFetch<T, D>({
    url,
    method,
    body: formik.values,
    withCredentials,
  })

  const fields: Fields<D> = useMemo(
    () =>
      Object.keys(formik.values).reduce((acc, fieldName) => {
        acc[fieldName as keyof D] = {
          value: formik.values[fieldName],
          error: formik.errors[fieldName],
          touched: formik.touched[fieldName],
        }
        return acc
      }, {} as Fields<D>),
    [formik.values, formik.errors, formik.touched],
  )

  const hasError = useMemo(() => hasErrors(formik.errors), [formik.errors])

  const form = useMemo(
    () => ({
      fields,
      hasError,
      handleSubmit: formik.handleSubmit,
      handleBlur: formik.handleBlur,
      handleChange: formik.handleChange,
    }),
    [
      fields,
      hasError,
      formik.handleSubmit,
      formik.handleBlur,
      formik.handleChange,
    ],
  )

  return { form, status, value, error }
}
