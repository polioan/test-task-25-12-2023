import type { ILogger } from './logger.interface.js'
import winston, { transports } from 'winston'

class Logger implements ILogger {
  constructor(
    private readonly logger = winston.createLogger({
      transports: [new transports.Console({})],
    })
  ) {}

  public info(message: string, ...meta: any[]) {
    this.logger.info(message, ...meta)
  }

  public warn(message: string, ...meta: any[]) {
    this.logger.warn(message, ...meta)
  }

  public error(message: string, ...meta: any[]) {
    this.logger.error(message, ...meta)
  }
}

export const logger: ILogger = new Logger()
