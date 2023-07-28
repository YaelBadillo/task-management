import { z } from 'zod'

export const LoginSchema = z.object({
  values: z.object({
    username: z.string().min(1, { message: 'Enter your username' }),
    password: z.string().min(1, { message: 'Enter your password' }),
  }),
})
