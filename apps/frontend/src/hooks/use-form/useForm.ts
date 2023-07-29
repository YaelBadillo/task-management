import { useMemo } from 'react'

import { useFormik, FormikValues } from 'formik'

import { useFetch } from '@hooks'
import { hasErrors } from '@utils/form-errors'
import { Fields, UseFormProperties } from '@use-form/useForm.types'
import { getFieldProps } from '@use-form/getFieldProps'

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
  formik.errors

  const fields: Fields<D> = useMemo(() => getFieldProps(formik), [formik])

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
