import { z } from 'zod'

import { UserSchema } from '@shared/schemas/user/User.schema'

export const RegisterUserSchema = z.object({
  body: UserSchema.extend({
    passwordConfirm: z.string(),
  }).refine(data => data.password === data.passwordConfirm, {
    message: "Passwords don't match.",
    path: ['passwordConfirm'],
  }),
})
