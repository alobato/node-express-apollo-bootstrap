import jsonScalar from 'graphql-type-json'

import userResolver from './user.resolver.js'

const scalars = [{ JSON: jsonScalar }]

export default [
  ...scalars,
  userResolver
]
