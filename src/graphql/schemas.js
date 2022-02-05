import { gql } from 'apollo-server-express'

import { userSchema } from './resolvers/user.resolver.js'

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }

  type File {
    id: String!
    url: String
    path: String!
    filename: String!
    mimetype: String!
    encoding: String!
  }

  scalar Date
  scalar JSON
`

export default [
  linkSchema,
  userSchema
]
