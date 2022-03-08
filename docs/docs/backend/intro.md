# 🎨✊📊 __Observatory of Spanish Artistic Precarity - Backend__ 📊✊🎨

## Instalation and setup (Ubuntu 20.04 LTS)

In order to setup and run the front-end run the following commands:

```
$ git clone https://github.com/p2pmodels/wallofshame-backend
$ cd wallofshame-backend
$ git checkout prod
$ docker-compose up
```

A new tab in your default browser should open automatically.

The front-end of this repo is in [Wall of Shame frontend](https://github.com/P2PModels/wallofshame-frontend)





The back-end of this prototype uses the following technologies:
- Hardhat framework alogn with Waffle for smart contracts development, testing and deploying. Visit [smart-contracts](./smart-contracts) folder.
- The Graph for indexing smart contracts events and provide processed data trough GrapQL API. Visit [thegraph](./thegraph) folder.
- Prisma with Postgres DB to provide access to the private backend trough a GraphQL API. Visit [graphql-server](./graphql-server) folder.

