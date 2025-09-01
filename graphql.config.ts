import type { IGraphQLConfig } from 'graphql-config'

export default {
  // TODO: use `process.env`
  schema: 'http://localhost:3000/gql',
  documents: 'src/**/*.{graphql,gql,ts}',
} as IGraphQLConfig
