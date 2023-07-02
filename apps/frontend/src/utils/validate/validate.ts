import { AnyZodObject, ZodError } from 'zod'

export const validate = (schema: AnyZodObject) => async (values: unknown) => {
  try {
    await schema.parseAsync({ values })
  } catch (error) {
    if (error instanceof ZodError)
      return error.issues.map(({ path, message }) => {
        return { path: String(path), message }
      })
  }
}
