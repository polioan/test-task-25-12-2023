import { z } from 'zod'

export const Edit = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  surname: z.string().optional(),
  gender: z.enum(['MALE', 'FEMALE']).optional(),
  photo: z.string().optional(),
})

export type EditType = z.infer<typeof Edit>
