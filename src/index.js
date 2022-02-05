import dotenv from 'dotenv'
import mongoose from 'mongoose'
import logger from './utils/logger.js'
import app from './app.js'

dotenv.config()

const PORT = process.env.PORT || 8000

mongoose.connect(process.env.CONNECTION_STRING).then(() => {
  // eslint-disable-next-line no-console
  console.log('Database connected')

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server ready at http://localhost:${PORT}`)
  })
}).catch((error) => {
  logger.error(error)
})
