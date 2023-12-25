import { z } from 'zod'

export const Register = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string(),
})

export type RegisterType = z.infer<typeof Register>
