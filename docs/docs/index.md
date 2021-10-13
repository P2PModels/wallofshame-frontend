# Welcome to the Wall of Shame prototype

## Introduction

The Wall of Shame prototype will combine data-activism with the Ethereum blockchain to provide a censorship-resistant dashboard of unpaid invoices from cultural workers.

<img src="./assets/images/Form.png" alt="Dashboard screenshot" width="51%" style="display: inline-block">
<img src="./assets/images/Dashboard.png" alt="Form screenshot" width="44.3%" style="display: inline-block">

Some screenshots from the current state of the prototype.

## Instalation and Setup

### Ubuntu 20.04 LTS

In order to setup and run the front-end open your command-line and run the following commands:

```
$ git clone https://github.com/p2pmodels/wallofshame-frontend
$ cd wallofshame-frontend
$ npm install
$ npm start
```

A new tab in your default browser should open automatically.

If you want to modify and deploy the a diferent smart contract or subgraph visit the [Wall of Shame backend repo](https://github.com/P2PModels/wallofshame-backend)

## Technology stack

### Frontend

-   React.js: this project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
-   [Material-UI](https://material-ui.com/getting-started/installation/): for UI components.
-   [Ethers.js v5](https://docs.ethers.io/v5/): for web3 interactions.
-   [useDapp](https://usedapp.io): provides useful react hooks for blockchain interactions.
-   [Apollo client](https://www.apollographql.com/docs/react/): to interact with The Graph network and our backend.
-   [GraphQL](https://graphql.org/): as the data transfer layer replacing traditional REST API's.

### Backend

-   Apollo server
-   Prisma
-   [GraphQL](https://graphql.org/): as the data transfer layer replacing traditional API's.
-   PostgresQL: database.

### Blockchain

-   Ethereum: blockchain 2.0 network.
-   Solidity: code language for developing smart contracts in Ethereum.
-   Hardhat: development tools to develope, test and deploy smart contracts.
-   Waffle: testing library for smart contracts.
-   The Graph: decentralized service for indexing complex events in the blockchain.

## Architecrure

<img src="./assets/images/architecture.jpg" width="90%" style="display: inline-block">

At the blockchain level we find the Invoice smart contract, which will serve as the application contract. The task of this contract is to abstract common characteristics of invoices and serve as a registry with permissions, events, status variables, etc.

At the backend level we use an Apollo server witha GraphQL API to make use of a hybrid architecture in which we can implement three different models:

1. Transparent use of blockchain without the option to recover account: The only ethereum account (EOA) would be the one of P2PModels and it will cover the costs for all the blockchain interactions. As mentioned in [Task assignment in Amara. Prototyping Round Robin with blockchain (I)](https://p2pmodels.eu/task-assignment-in-amara-prototype-round-robin/):

    > The idea behind this component is to cover the costs related to these transactions. We want to spare the users (linguists) this expense, as it could severely affect the user experience and usability of the prototype. For the time being, costs will be assumed by a P2P Models Ethereum account, but in the future, an Amara account could be used to handle expenses. Another solution could be a multi-signature account controlled by the linguists themselves.

2. Transparent use of blockchain with the possibility for the user of recovering the EOA and start using the web3 interface.
3. Web3 interface by default: this means the user has to be familiar, or learn it, with the blockchain technology.

In this prototype we are going to test the user experience for each scenario to provide some insights in the usability of web3 services for new users. ~~Therefore, the backend server will be used for handeling blockchain logic in scenarios 1 and 2.~~ ¿? We use Prisma as middleware software to add this resolvers that may interact with ethereum and also to automatize the database (PostgresQL) management and improve code quality.

At the frontend level we have a react app with an Apollo client that conects both with the backend API and the graph (GraphQL endpoints) and also to ethereum through

We will also use a second server, corresponding to the Transaction Manager component, that will be in charge of reassigning the tasks once their allotted time period has lapsed. This will be done through cron jobs, which will be run by sending a transaction to the contract whenever a task’s allotted period of time is up, thereby reassigning the task to a new user. The server will listen to contract events that are issued when a new job is created in order to then prepare a cron job.

## References

-   [Dashboard template](https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/dashboard)
-   [Map charts library](https://www.react-simple-maps.io/)
-   [Form tutorial](https://www.youtube.com/watch?v=-XKaSCU0ZLM)
