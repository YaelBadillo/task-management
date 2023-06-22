import { z } from 'zod'
import { UserSchema } from './User.schema'

export const RegisterUserSchema = z.object({
  body: UserSchema,
})
