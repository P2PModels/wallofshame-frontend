# __Observatory of Spanish Artistic Precarity__

<img src="/assets/images/Map.png" alt="Map screenshot">
<img src="/assets/images/Dashboard.png" alt="Dashboard screenshot">


## Introduction

The Observatory of Spanish Artistic Precarity prototype is a dynamic platform that visualizes metric data regarding current worker conditions and provides more visibility to the problem of precarity for cultural workers. At the same time, it allows users to create networks with each other and reach out to help entities after posting their public denouncement. Thanks to blockchain technology, the platform will be transparent and harder to censor (contrary to other projects based on mainstream platforms, e.g.@TrabajosRuineros). By relying on a set of quantitative data provided by users, we should also be able to visualize and address salary gaps depending on gender, location and type of (artistic) profession, which can help further analysis and policy-making around precarity. 

The prototype has three main goals:

- __Monitorization__: provide data to organizations and collectives in order to develop strategies for solving this issue through social means.

- __Visibilization__: raise awareness of job insecurity in Spain to the public.

- __Collectivization__: ease the process of contacting organizations, collectives and individuals with similar issues with the intention of increasing social participation outside the digital sphere.

<img src="/assets/images/Form.png" alt="Form screenshot">

## Demo

If you want to test the current version of the prototype check the [live demo](https://p2pmodels.eu).

## Prototype architecture

The prototype is still in development stage which means that some parts of it might change, get removed or added.

<img src="/assets/images/architecture.jpg" alt="Arquitecture diagram" width="80%">


At the <b>frontend level</b> we have a React app with an Apollo client that connects to the backend API gateway. For more information read the [docs of the front end repo](https://github.com/P2PModels/wallofshame-frontend).

At the <b>backend level</b> we have an API gateway implemented with Apollo server, GraphQL for the API's and GraphQL Tools for Schema Stitching. The main benefit of this piece of software is the use of a hybrid architecture, in which we can implement both modern web services and web3 services running simultaneusly seamlesly. 

The current services provided to the client are: users service (for email sharing between participants), cases backend service (for reporting a new case), cases subgraph servie (to get access to reported cases and metrics). For more information read the [docs of the back end repo](https://github.com/P2PModels/wallofshame-backend).

At the <b>blockchain level</b> we find the Case Registry smart contract, which will serve as a registry for the reported cases. The cases subgraph will process the events triggered when a new case is registered to update the current metrics of the platform. For more information read the [docs of the back end repo](https://github.com/P2PModels/wallofshame-backend).

## Technology stack

<img src="/assets/images/stack.jpg" alt="Arquitecture diagram" width="80%">

The main frameworks and libraries used in this prototype are:

### Frontend

-   React.js: this project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
-   [Material-UI](https://material-ui.com/getting-started/installation/): for UI components.
-   [Ethers.js v5](https://docs.ethers.io/v5/): for web3 interactions.
-   [useDapp](https://usedapp.io): provides useful react hooks for blockchain interactions.
-   [Apollo client](https://www.apollographql.com/docs/react/): to interact with The Graph network and our backend.
-   [GraphQL](https://graphql.org/): as the data transfer layer replacing traditional REST API's.

### Backend

-   [Apollo server](https://www.apollographql.com/docs/apollo-server/)
-   [Prisma](https://www.prisma.io/): node.js ORM to manage your db.
-   [Nexus](https://nexusjs.org/): Declarative, Code-First GraphQL Schemas for JavaScript/TypeScript
-   [GraphQL](https://graphql.org/): as the data transfer layer replacing traditional API's.
-   [PostgresQL](https://www.postgresql.org/): open-source relationtal database.

### Blockchain

-   [Ethereum](https://ethereum.org/en/): blockchain 2.0 network.
-   [Solidity](https://soliditylang.org/): programming language for developing smart contracts in the Ethereum blockchain.
-   [Hardhat](https://hardhat.org/): development tools to develope, test and deploy smart contracts.
-   [Waffle](https://ethereum-waffle.readthedocs.io/en/latest/): testing library for smart contracts.
-   [The Graph](https://thegraph.com/en/): decentralized service for indexing complex events in the blockchain.

### Deployment

-   [Docker](https://www.docker.com/): containerize and automatize development.

## License

This prototype is licensed under [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html)
