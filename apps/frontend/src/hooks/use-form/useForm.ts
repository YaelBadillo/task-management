import { useMemo } from 'react'

import { useFormik, FormikValues, FormikErrors } from 'formik'
import { HttpException } from 'shared'

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

  const previousFields: Fields<D> = useMemo(() => {
    return getFieldProps(formik)
  }, [formik])

  const fields: Fields<D> = useMemo(() => {
    if (status === 'error' && error instanceof HttpException) {
      previousFields[error.path as keyof D].error = error.message
        ? (error.message as FormikErrors<D>[keyof D])
        : previousFields[error.path as keyof D].error
    }

    return previousFields
  }, [previousFields, status, error])

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
