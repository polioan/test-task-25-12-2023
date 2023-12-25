import { env } from '../services/env/env.js'
import { PrismaClient } from '@prisma/client'

const globalForDatabase = globalThis as unknown as {
  db: PrismaClient | undefined
}

export const db =
  globalForDatabase.db ??
  new PrismaClient({
    log:
      env.getOrThrow('NODE_ENV') === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  })

if (env.getOrThrow('NODE_ENV') !== 'production') {
  globalForDatabase.db = db
}
