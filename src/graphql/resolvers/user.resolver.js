import { gql } from 'apollo-server-express'

export const userSchema = gql`
  type User {
    email: String
    name: String
  }
  extend type Query {
    me: User
  }
`

export default {
  Query: {
    me: async (_, __, { me }) => {
      // eslint-disable-next-line no-console
      console.log('!me', me)
      return { email: 'admin@admin.com', name: 'Admin' }
    }
  }
}
