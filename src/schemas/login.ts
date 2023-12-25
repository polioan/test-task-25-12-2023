import { z } from 'zod'

export const Login = z.object({
  email: z.string().email(),
  password: z.string(),
})

export type LoginType = z.infer<typeof Login>
