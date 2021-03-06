# 📊 Wall of Shame 📊

The Wall of Shame prototype combines data-activism with the Ethereum blockchain to provide a censorship-resistant dashboard of unpaid or delayed invoices from cultural workers.

## Screenshots

<img src="./public/assets/map.png" width="49%" style="display: inline-block">
<img src="./public/assets/dashboard.png" width="49%" style="display: inline-block">
<img src="./public/assets/form.png" width="49%" >
<img src="./public/assets/form2.png" width="49%" >

## Instalation and Setup

In order to setup and run the front-end run the following commands:

```
$ npm install
$ npm start
```

A new tab in your default browser should open automatically.

If you want to modify and deploy the a diferent smart contract or subgraph visit the [Wall of Shame backend repo](https://github.com/P2PModels/wallofshame-backend)

## Documentation

Read the [docs](https://observatorio.docs.p2pmodels.eu) for more information

## References

-   This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)
-   We use [Material-UI](https://material-ui.com/getting-started/installation/) for UI components
-   [Ethers.js v5](https://docs.ethers.io/v5/) for web3 interactions
-   The MetaMask connection is handled by [useMetamask React Hook](https://github.com/mdtanrikulu/use-metamask)
-   [Apollo client](https://www.apollographql.com/docs/react/) to interact with The Graph network and our backend
-   [Dashboard template](https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/dashboard)
-   [Map charts library](https://www.react-simple-maps.io/)
-   [Form tutorial](https://www.youtube.com/watch?v=-XKaSCU0ZLM)

## Deployment

[![Deploy client app](https://github.com/P2PModels/wallofshame-frontend/actions/workflows/deploy-app.yml/badge.svg)](https://github.com/P2PModels/wallofshame-frontend/actions/workflows/deploy-app.yml)