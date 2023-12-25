import express from 'express'
import httpStatus from 'http-status'
import { auth } from '../../middlewares/auth.js'
import { Edit } from '../../schemas/edit.js'
import { profile } from '../../services/profile/profile.js'
import { ApiError } from '@polioan/api-error'

const router = express.Router()

router.put('/:id', auth, async (req, res, next) => {
  try {
    if (req.userId !== req.params.id) {
      throw ApiError.forbidden('This is not your account')
    }
    const dto = Edit.parse(req.body)
    await profile.edit(dto, Number(req.userId))
    return res.status(httpStatus.OK).json({ message: 'Ok' })
  } catch (e) {
    return next(e)
  }
})

export default router
