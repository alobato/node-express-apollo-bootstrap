import dotenv from 'dotenv'
import winston from 'winston'
import TelegramLogger from 'winston-telegram'

dotenv.config()

const { combine, timestamp, json } = winston.format

const logger = winston.createLogger({
  level: 'info',
  defaultMeta: { service: 'user-service' },
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.Console({
      silent: process.env.NODE_ENV === 'test',
      level: process.env.NODE_ENV === 'production' ? 'error' : 'debug'
    })
  ],
  exitOnError: false
})

if (process.env.TELEGRAM_LOGGER_ENABLED === 'true') {
  logger.add(
    new TelegramLogger({
      silent: process.env.NODE_ENV !== 'production',
      level: 'error',
      token: process.env.TELEGRAM_TOKEN,
      chatId: Number(process.env.TELEGRAM_TO)
    })
  )
}

export default logger
