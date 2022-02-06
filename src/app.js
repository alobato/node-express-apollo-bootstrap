import express from 'express'
import morgan from 'morgan'

import logger from './utils/logger.js'
import cors from './utils/cors.js'
import routes from './routes/index.js'

const app = express()
app.use(express.json({ limit: '50mb' }))
app.use(cors)
app.use(morgan('combined', { stream: { write: (message) => logger.info(message) } }))
app.use('/uploads', express.static(process.env.UPLOADS_PATH))
app.use('/', routes)

export default app
