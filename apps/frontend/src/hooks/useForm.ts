import { useFormik, FormikValues, FormikErrors, FormikTouched } from 'formik'

import { useFetch } from '@hooks'

interface UseFormProperties<D> {
  url: string
  initialValues: D
  withCredentials?: boolean
  validate?: (values: D) => void | object | Promise<FormikErrors<D>>
  initialTouched?: FormikTouched<D>
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

  return { formik, status, value, error }
}
