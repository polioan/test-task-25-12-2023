import type { IEnv } from './env.interface.js'
import { config } from 'dotenv'

class Env implements IEnv {
  private readonly config: Record<string, string | undefined>

  constructor() {
    const { error, parsed } = config()
    if (error) {
      throw new Error('Error reading .env file', { cause: error })
    }
    if (!parsed) {
      throw new Error('Empty or broken .env file')
    }
    this.config = { ...process.env, ...parsed }
  }

  public get(key: string) {
    const result = this.config[key]
    return result
  }

  public getOrThrow(key: string) {
    const result = this.config[key]
    if (!result) {
      throw new Error(`Key "${key}" not found in .env file`)
    }
    return result
  }
}

export const env: IEnv = new Env()
