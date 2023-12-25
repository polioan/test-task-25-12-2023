import { ApiError } from '@polioan/api-error'
import { db } from '../../common/database.js'
import type { RegisterType } from '../../schemas/register.js'
import { compare, hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { env } from '../env/env.js'
import type { LoginType } from '../../schemas/login.js'

class Auth {
  public async register({ name, email, password }: RegisterType) {
    const user = await db.user.findUnique({ where: { email } })

    if (user) {
      throw ApiError.conflict('User already exists')
    }

    const { id } = await db.user.create({
      data: { email, name, password: await hash(password, 10) },
    })

    return this.getToken(id)
  }

  public async login({ email, password }: LoginType) {
    const user = await db.user.findUnique({ where: { email } })

    const InvalidCredentialsErr = ApiError.badRequest('Invalid credentials')

    if (!user) {
      throw InvalidCredentialsErr
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      throw InvalidCredentialsErr
    }

    return this.getToken(user.id)
  }

  private getToken(value: string | number) {
    return { token: jwt.sign(String(value), env.getOrThrow('JWT_SECRET')) }
  }
}

export const auth = new Auth()
