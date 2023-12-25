import jwt from 'jsonwebtoken'
import type { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { env } from '../services/env/env.js'

export function auth(req: Request, res: Response, next: NextFunction) {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const token = req?.headers?.authorization?.split(' ')[1]
    if (!token) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: 'User is not authorized' })
    }

    const decoded = jwt.verify(token, env.getOrThrow('JWT_SECRET'))
    // @ts-expect-error Assigning user to request in middleware (req.user will be readonly in any other places)
    req.userId = decoded

    return next()
  } catch {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: 'User is not authorized' })
  }
}
