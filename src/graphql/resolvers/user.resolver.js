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
    me: async () => {
      return { email: 'admin@admin.com', name: 'Admin' }
    }
  }
}
