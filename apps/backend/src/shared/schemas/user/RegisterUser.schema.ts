import { z } from 'zod'

import { UserSchema } from '@shared/schemas/user/User.schema'

export const RegisterUserSchema = z.object({
  body: UserSchema,
})
