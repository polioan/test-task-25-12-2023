import express from 'express'
import httpStatus from 'http-status'
import { profile } from '../../services/profile/profile.js'

const router = express.Router()

router.get('/:id', async (req, res, next) => {
  try {
    const data = await profile.get(Number(req.params.id))
    return res.status(httpStatus.OK).json(data)
  } catch (e) {
    return next(e)
  }
})

export default router
