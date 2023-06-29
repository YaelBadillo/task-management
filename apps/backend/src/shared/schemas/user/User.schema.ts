import { z } from 'zod'

export const UserSchema = z.object({
  username: z.string().min(4).max(20),
  password: z.string().min(7).max(30),
})
