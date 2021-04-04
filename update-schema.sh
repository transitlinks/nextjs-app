yarn run apollo schema:download --endpoint=http://localhost:7000/v2/graphql
yarn run apollo codegen:generate --localSchemaFile=schema.json --target=typescript --includes=src/**/*.ts --tagName=gql --globalTypesFile=src/generated/types/globalTypes.ts --outputFlat src/generated/types
