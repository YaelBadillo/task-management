export const hasError = (
  error: string | undefined,
  touched: boolean | undefined,
) => (error && touched ? error : undefined)
