import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema:
    'https://api-sa-east-1.hygraph.com/v2/clok4dptf4o7n01upadree4jz/master',
  documents: 'src/graphql/**/*.graphql',
  generates: {
    'src/graphql/': {
      preset: 'client',
      plugins: [],
    },
  },
}

export default config
