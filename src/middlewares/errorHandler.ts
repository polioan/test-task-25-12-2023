import type { NextFunction, Request, Response } from 'express'
import status from 'http-status'
import { ApiError } from '@polioan/api-error'
import { logger } from '../services/logger/logger.js'
import { ZodError } from 'zod'

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message })
  }
  if (err instanceof ZodError) {
    return res.status(status.BAD_REQUEST).json({ message: err.errors })
  }
  logger.error('Internal server error!', err)
  return res
    .status(status.INTERNAL_SERVER_ERROR)
    .json({ message: 'Internal server error!' })
}
