import { AnyZodObject, ZodError } from 'zod'

export const validate = (schema: AnyZodObject) => async (values: unknown) => {
  const errors: { [key: string]: string } = {}

  try {
    await schema.parseAsync({ values })
  } catch (error) {
    if (error instanceof ZodError) {
      error.issues.forEach(({ path, message }) => {
        errors[String(path[1])] = message
      })
    }
  }

  return errors
}
