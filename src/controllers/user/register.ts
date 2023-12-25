import express from 'express'
import httpStatus from 'http-status'
import { auth } from '../../services/auth/auth.js'
import { Register } from '../../schemas/register.js'

const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    const dto = Register.parse(req.body)
    const data = await auth.register(dto)
    return res.status(httpStatus.CREATED).json(data)
  } catch (e) {
    return next(e)
  }
})

export default router
