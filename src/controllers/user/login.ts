import express from 'express'
import httpStatus from 'http-status'
import { auth } from '../../services/auth/auth.js'
import { Login } from '../../schemas/login.js'

const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    const dto = Login.parse(req.body)
    const data = await auth.login(dto)
    return res.status(httpStatus.OK).json(data)
  } catch (e) {
    return next(e)
  }
})

export default router
