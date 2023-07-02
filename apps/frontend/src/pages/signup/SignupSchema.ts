import { z } from 'zod'

export type SignupValuesType = z.infer<typeof SignupSchema>

export const SignupSchema = z.object({
  values: z
    .object({
      username: z.string().min(4).max(20),
      password: z.string().min(7).max(30),
      passwordConfirm: z.string(),
    })
    .refine(data => data.password === data.passwordConfirm, {
      message: "Passwords don't match.",
      path: ['passwordConfirm'],
    }),
})
