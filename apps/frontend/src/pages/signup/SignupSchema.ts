import { z } from 'zod'

export type SignupValuesType = z.infer<typeof SignupSchema>

export const SignupSchema = z.object({
  values: z
    .object({
      username: z
        .string()
        .min(4, { message: 'Username must contain at least 4 character(s)' })
        .max(20, { message: 'Username must contain at most 20 character(s)' }),
      password: z
        .string()
        .min(7, { message: 'Password must contain at least 7 character(s)' })
        .max(30, { message: 'Password must contain at most 20 character(s)' }),
      passwordConfirm: z.string(),
    })
    .refine(data => data.password === data.passwordConfirm, {
      message: "Passwords don't match.",
      path: ['passwordConfirm'],
    }),
})
