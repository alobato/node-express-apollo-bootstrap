import dotenv from 'dotenv'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageDisabled } from 'apollo-server-core'
// SUBSCRIPTION
import { execute, subscribe } from 'graphql'
import { SubscriptionServer } from 'subscriptions-transport-ws'

dotenv.config()

export function createApolloServer({ httpServer, schema, getContext, subscriptionServer = null }) {
  const plugins = [ApolloServerPluginDrainHttpServer({ httpServer })]
  // SUBSCRIPTION
  if (subscriptionServer) {
    plugins.push({
      async serverWillStart() {
        return {
          async drainServer() {
            subscriptionServer.close()
          }
        }
      }
    })
  }
  if (process.env.NODE_ENV === 'production') {
    plugins.push(ApolloServerPluginLandingPageDisabled)
  }

  const apolloServer = new ApolloServer({
    schema,
    formatError: (error) => {
      if (process.env.NODE_ENV === 'production') {
        const message = error?.message ? error.message.replace('SequelizeValidationError: ', '').replace('Validation error: ', '') : 'Internal server error'
        return new Error(message)
      }
      return error
    },
    context: async ({ req }) => {
      if (req) {
        const authorization = req?.headers?.authorization || ''
        const token = authorization.replace('Bearer ', '')
        return await getContext(token)
      }
    },
    plugins
  })
  return apolloServer
}

// SUBSCRIPTION
export function createSubscriptionServer({ httpServer, schema, path = '/graphql' }) {
  return SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      onConnect(connectionParams, webSocket, context) {
        // eslint-disable-next-line no-console
        console.log('Connected!')
      },
      onDisconnect(webSocket, context) {
        // eslint-disable-next-line no-console
        console.log('Disconnected!')
      }
    },
    {
      server: httpServer,
      path
    }
  )
}
