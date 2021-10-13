# Apollo server with Prisma middleware and GraphQL end-point

## Apollo server

We use Apollo server for the prototype backend, please visit the great [documentation](https://www.apollographql.com/docs/apollo-server/) to get started with this library.

<br>

<img src="/assets/images/apollo-diagram.svg" alt="Apollo server diagram" width="70%" style="display: inline-block">

[Source: Apollo server documentation, introduction](https://www.apollographql.com/docs/apollo-server/)

## Prisma, Nexus & GraphQL

Prisma is an Object-Relational Mapping (ORM) that helps us converting the data from any Graphql request to a db compatible type, it also improves our code quality and automatizes the db management. Check the [documentation](https://www.prisma.io/docs/) to learn more about its capabilities.

## Login

The login architecture for the backend is inspired in [this example from Prisma repositories](https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-auth). The [jwt (Json Web Token) library](https://jwt.io/introduction) is used alongside [bcryptjs](https://www.npmjs.com/package/bcryptjs). Users id are generated with the standard built-in implementaion of UUID of PostgresQL throuth the `@default(uuid)` rule in the _./prisma/schema.prisma_ data model. This can also be done manually in the resolvers or in the client with the [uuid library](https://www.npmjs.com/package/uuid). For the authorization rules, the [graphql-shield](https://graphql-shield.vercel.app/) and [graphql-middleware](https://www.npmjs.com/package/graphql-middleware) libraries are used.

!!! warning "Security vulnerability"
    The _verify_ method from jsonwbtoken library gets the user id from the provided token. In our code we use this method in the shield rules to grant access to some API resolvers. This means that an old token can be used to verify the user. A session id should be implemented to avoid this risk. Meanwhile we check both the user id and a connection flag which is not a solution but an improvement.


