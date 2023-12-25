import { ApiError } from '@polioan/api-error'
import { db } from '../../common/database.js'
import type { EditType } from '../../schemas/edit.js'

class Profile {
  public async edit(dto: EditType, userId: number) {
    await db.user.update({
      where: { id: userId },
      // @ts-expect-error
      data: dto,
    })
  }

  public async get(userId: number) {
    const result = await db.user.findUnique({ where: { id: userId } })
    if (!result) {
      throw ApiError.notFound('User not found')
    }
    const { createdAt, email, gender, id, name, photo, surname } = result
    return { createdAt, email, gender, id, name, photo, surname }
  }

  public async getPage(pageNumber: number) {
    if (pageNumber < 1) {
      throw ApiError.badRequest('Invalid page number')
    }

    const PAGE_SIZE = 10

    const result = (
      await db.user.findMany({
        take: PAGE_SIZE,
        skip: (pageNumber - 1) * PAGE_SIZE,
        orderBy: { createdAt: 'desc' },
      })
    ).map(({ createdAt, email, gender, id, name, photo, surname }) => ({
      createdAt,
      email,
      gender,
      id,
      name,
      photo,
      surname,
    }))

    return result
  }
}

export const profile = new Profile()
