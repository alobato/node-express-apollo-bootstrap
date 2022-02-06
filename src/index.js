import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { createServer } from 'http'
import logger from './utils/logger.js'
import app from './app.js'

// APOLLO
import { makeExecutableSchema } from '@graphql-tools/schema'
import typeDefs from './graphql/schemas.js'
import resolvers from './graphql/resolvers/index.js'
import { createApolloServer, createSubscriptionServer } from './utils/apollo.js'
import getContext from './utils/context.js'

dotenv.config()

async function connectMongoose(connectionString) {
  try {
    await mongoose.connect(connectionString)
    // eslint-disable-next-line no-console
    console.log('🗃 Mongoose connected')
  } catch (error) {
    logger.error(error)
  }
}

async function startServer(port) {
  const httpServer = createServer(app)

  // APOLLO
  const schema = makeExecutableSchema({ typeDefs, resolvers })
  // SUBSCRIPTION
  const subscriptionServer = createSubscriptionServer({ httpServer, schema })
  const apolloServer = createApolloServer({ httpServer, schema, getContext, subscriptionServer })
  await apolloServer.start()
  // eslint-disable-next-line no-console
  console.log('🪐 Apollo Server started')
  apolloServer.applyMiddleware({ app })

  httpServer.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`)
  })
}

connectMongoose(process.env.CONNECTION_STRING)
startServer(process.env.PORT || 8000)
