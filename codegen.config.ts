import type { CodegenConfig } from '@graphql-codegen/cli'

export default {
  // TODO: use `process.env`
  schema: 'http://localhost:3000/gql',
  documents: ['src/**/*.ts', 'src/**/*.vue'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    'src/core/graphql/': {
      preset: 'client',
      config: {
        useTypeImports: true,
        scalars: {
          DateTime: 'string',
          Email: 'string',
          URL: 'string',
          UUID: 'string',
        },
      },
    },
  },
  hooks: {
    afterAllFileWrite: ['prettier src/core/graphql --write'],
  },
} as CodegenConfig
