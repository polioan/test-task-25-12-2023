import express from 'express'
import httpStatus from 'http-status'
import { profile } from '../../services/profile/profile.js'

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const data = await profile.getPage(Number(req.query.page))
    return res.status(httpStatus.OK).json(data)
  } catch (e) {
    return next(e)
  }
})

export default router
