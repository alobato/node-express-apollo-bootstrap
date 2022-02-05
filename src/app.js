import express from 'express'
import morgan from 'morgan'

// GRAPHQL
import { createServer } from 'http'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './graphql/schemas.js'
import resolvers from './graphql/resolvers/index.js'

import logger from './utils/logger.js'
import cors from './utils/cors.js'
import routes from './routes/index.js'

const app = express()
app.use(express.json({ limit: '50mb' }))
app.use(cors)
app.use(morgan('combined', { stream: { write: (message) => logger.info(message) } }))
app.use('/uploads', express.static(process.env.UPLOADS_PATH))
app.use('/', routes)

// GRAPHQL
const httpServer = createServer(app)
const schema = makeExecutableSchema({ typeDefs, resolvers })
const server = new ApolloServer({ schema })
server.start().then(() => {
  server.applyMiddleware({ app })
})

export default httpServer
