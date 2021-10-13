# How to add a feature?

## The project structure

In this section we will walk you through the main files and folders of the project. In the following tree you'll find the main documents to pay attention to, the rest of the files and folders might be automatically generated or a bit advanced for this guide:

📦 graphql-server <br>
┣ 📂 prisma <br>
┃ ┣ 📜 schema.prisma <br>
┃ ┗ 📜 seed.ts <br>
┣ 📂 scripts <br>
┃ ┗ 📜 init_backend.sh <br>
┣ 📂 src <br>
┃ ┣ 📜 context.ts <br>
┃ ┣ 📜 schema.ts <br>
┃ ┣ 📜 server.ts <br>
┃ ┗ 📜 utils.ts <br>
┣ 📜 .env <br>
┣ 📜 package.json <br>
┗ 📜 schema.graphql <br>

_/src/server.ts_

The entry point of the backend, here we can configure the apollo server: load the context and schema and define the port.

_/src/schema.ts_

In this file we define the types and resolvers of our API.

_/prisma/schema.prisma_

Here we define the Data Model, since GraphQL is used, the model will use entities (models) and types(enums). We'll also tell Prisma what datasource we'll use (our Postgres db) and the generator (js prisma client).

## Adding a new field to an entity

The flow of this process is:

1. Add field to data model, _prisma/schema.prisma_.
2. Add field to input types, _src/schema.ts_.
3. Add query/mutation resolver and update affected resolvers, _src/schema.ts_.
4. Update seed function, _prisma/seed.ts_.
5. Start server, _scripts/init_backend.sh_
6. Test affected queries/mutations with graphiql.

(Frontend)

7. Update affected client queries.
8. Create/update frontend components.
9. Test client.
