import cors from 'cors'
import express from 'express'
import { logger } from './services/logger/logger.js'
import { env } from './services/env/env.js'
import { errorHandler } from './middlewares/errorHandler.js'
// Controllers
import userRegister from './controllers/user/register.js'
import userLogin from './controllers/user/login.js'
import editProfile from './controllers/profile/editProfile.js'
import getProfile from './controllers/profile/getProfile.js'
import getProfiles from './controllers/profile/getProfiles.js'

function setupControllers(app: ReturnType<typeof express>) {
  app.use('/user/register', userRegister)
  app.use('/user/login', userLogin)
  app.use('/profile', editProfile)
  app.use('/profile', getProfile)
  app.use('/profiles', getProfiles)
}

async function bootstrap() {
  const app = express()

  app.use(cors({ origin: '*' }))
  app.use(express.json({}))
  app.disable('x-powered-by')

  setupControllers(app)

  app.use(errorHandler)

  await new Promise<void>(resolve => {
    app.listen(env.getOrThrow('PORT'), resolve)
  })
}

bootstrap()
  .then(() => {
    logger.info(`Server started at :${env.getOrThrow('PORT')}`)
  })
  .catch(e => {
    logger.error('Server failed.', e)
    process.exit(1)
  })
