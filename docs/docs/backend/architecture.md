# Backend architecture

## Tech stack discussion

### Hybrid architecture

One of the main goals of this prototype is to provide a progressive adoption of the web 3.0 technologies by the end user, then why would our backend need a web2.0 architecture? Since we want to provide our users with web2.0 UI’s we need to handle things in the backend so they don’t have to worry about transactions, wallets, etc. But this doesn’t mean we need a hybrid architecture since we could be using only web 3.0 technologies in our backend. The main benefit of using a hybrid architecture is the flexibility given by the fact that we can offer the same service to the user whether it is web 2.0 or web 3.0. This means that if we want to use an authentication service developed by us with modern web2.0 stack we could provide it and later on add the same service using blockchain solutions.


### Monolithic API vs. Microservices through API gateway/proxy

The question is: should we keep just one backend server with all the services or should we break it down to multiple ones applying the separation of concerns pattern?

A monolithic approach its faster to develop and can be clean if the resolvers get separated in different files.On the other hand a microservices architecture ensures scalability and a cleaner way of integrating multiple third party services to the client.

This last point <i>"cleaner way of integrating multiple third party services to the client"</i> seems contrary to the web3 paradigm where clients tend to be "more independent" from a single backend provider. On the other hand, with this prototype we are questioning that approach to web3 adoption since a big issue with UX has been proved in the onboarding of new web3 adopters.  

Moreover, the microservices architecture gives us the flexibility to migrate web2 services to web3 technologies progressively which is a great benefit when working with organizations. Therefore, the microservices architecture with a single entry point for the backend seems better for web3 adoption (simpler client).

### Federation services vs Schema stitching

**What is shema stitching?**

When implementing microservices architecture through a API gateway we can find the solution provided by [GraphQl Tools](https://www.graphql-tools.com/docs/) called schema stitching. This <i>library</i> implements a GraphQl gateway to integrate multiple schemas into a unique endpoint.

**What is a federation service?**

Another popular solution to Graphql gateway is [Apollo Federation](https://www.apollographql.com/docs/federation/). This solution, which might seem a great choice at first glance, comes with a big dependence on the Apollo Studio service which provides a cloud platform for subgraph development in a collaborative way along with a supergraph composition automation service.

Quoting [Schema stitching Handbook](https://github.com/gmac/schema-stitching-handbook):

> As you get the hang of schema stitching, you may find that Federation services are fairly complex for what they do. The buildFederatedSchema method from the @apollo/federation package creates a nuanced GraphQL resource that does not guarentee itself to be independently consistent, but plugs seamlessly into a greater automation package. By comparison, stitching encourages services to be independently valid and self-contained GraphQL resources, which makes them quite primitive and durable. While federation automates service bindings at the cost of tightly-coupled complexity, stitching embraces loosely-coupled bindings at the cost of manual setup. The merits of each strategy are likely to be a deciding factor for developers selecting a platform. Stitching is a library used to build a framework like Federation.

### Type merging in microservices architecture

This is the main idea behind graphql gateway and schema stitching. In order to make use of a microservices architecture we need to implement type merging in our graphs. For an introducction in this topic check: [Single record type merging](https://github.com/gmac/schema-stitching-handbook/tree/master/type-merging-single-records).

---

## Stack

Each microservice has the folowing stack: Apollo-GraphQL server with Nexus types, Prisma ORM and PostgresQL db.

### Apollo server

We use Apollo server for the prototype backend, please visit the great [documentation](https://www.apollographql.com/docs/apollo-server/) to get started with this library.

### GraphQL Tools: Schema stitching

We use [GraphQL Tools](https://www.graphql-tools.com/docs/schema-stitching/stitch-combining-schemas) by [The Guild](https://the-guild.dev/) to implement our GraphQL gateway. For more information regarding schema stitching visit the great [Schema Stitching Handbook by Greg MacWilliam](https://github.com/gmac/schema-stitching-handbook) which also has some videos. The current implementation is based in these chapters: [Combining local and remote schemas](https://github.com/gmac/schema-stitching-handbook/tree/master/combining-local-and-remote-schemas), [Single record type merging](https://github.com/gmac/schema-stitching-handbook/tree/master/type-merging-single-records). There is also a frozen version which implements user authentication, login... Instead of using <i>graphql-express</i> we use ApolloServer.

Related articles:

[Microservice architecture with GraphQL](https://itnext.io/graphql-in-a-microservices-architecture-d17922b886eb)

[Apollo GraphQL principles](https://principledgraphql.com/)

[Improve microservice architecture with GraphQL](https://blog.logrocket.com/improve-microservice-architecture-graphql-api-gateways/)

[7 benefits of using GraphQL in microservices architecture](https://nordicapis.com/7-unique-benefits-of-using-graphql-in-microservices/)

### Nexus

TODO

[Nexus.js docs](https://nexusjs.org/docs/):

> Robust, composable type definition for GraphQL in TypeScript/JavaScript.

### Prisma

TODO (clarify, improve desciption)

Prisma is an Object-Relational Mapping (ORM) that helps us converting the data from any Graphql request to a db compatible type, it also improves our code quality and automates the db management. Check the [documentation](https://www.prisma.io/docs/) to learn more about its capabilities.

---

## Architecture

<img src="/assets/images/apollo-diagram.svg" alt="Apollo server diagram" width="70%" style="display: inline-block">

[Source: Apollo server documentation, introduction](https://www.apollographql.com/docs/apollo-server/)

### Microservices: Cases

### Microservices: Users

### Frozen implementation: Login

The login architecture for the backend is inspired in [this example from Prisma repositories](https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-auth). The [jwt (Json Web Token) library](https://jwt.io/introduction) is used alongside [bcryptjs](https://www.npmjs.com/package/bcryptjs). Users id are generated with the standard built-in implementaion of UUID of PostgresQL throuth the `@default(uuid)` rule in the _./prisma/schema.prisma_ data model. This can also be done manually in the resolvers or in the client with the [uuid library](https://www.npmjs.com/package/uuid). For the authorization rules, the [graphql-shield](https://graphql-shield.vercel.app/) and [graphql-middleware](https://www.npmjs.com/package/graphql-middleware) libraries are used.

!!! warning "Security vulnerability"
The _verify_ method from jsonwbtoken library gets the user id from the provided token. In our code we use this method in the shield rules to grant access to some API resolvers. This means that an old token can be used to verify the user. A session id should be implemented to avoid this risk. Meanwhile we check both the user id and a connection flag which is not a solution but an improvement.
