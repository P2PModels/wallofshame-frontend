# How to add a feature?

## The project structure

In this section we will walk you through the main files and folders of the project. In the following tree you'll find the main documents to pay attention to, the rest of the files and folders might be automatically generated or a bit advanced for this guide:

📦smart-contracts <br>
┣ 📂contracts <br>
┃ ┗ 📜CaseRegistry.sol <br>
┣ 📂deploy <br>
┃ ┗ 📜rinkeby.js <br>
┣ 📂deployments <br>
┃ ┗ 📂rinkeby <br>
┃ ┃ ┣ 📂solcInputs <br>
┃ ┃ ┣ 📜.chainId <br>
┃ ┃ ┗ 📜CaseRegistry.json <br>
┣ 📂test <br>
┃ ┗ 📜CaseResgistry.js <br>
┣ 📜.env <br>
┣ 📜.env.example <br>
┣ 📜.gitignore <br>
┣ 📜hardhat.config.js <br>
┗ 📜package.json <br>

_/contracts/CaseRegistry.sol_

The smart contract used to store the cases data.

_/test/CaseRegistry.js_

The tests for the smart contract.

_/deploy/rinkeby/CaseRegistry.json_

The resulting json file from deployment. Contains the abi, receipt, owner address and more.

_/deployments/rinkeby.js_

The deploy script.

_/hardhat.config.js_

Configuration file for hardhat plugins, accounts, providers and networks.

_/.env_

Secrets file to inject through environment variables.

## Developing smart contracts

For local development of smart contracts we use the Hardhart framework. The main difference between Hardhat and other frameworks like Truffle is that Hardhat is modular and agnostic of the workflow, therefore it is an open framework that embracess the development of plugins by the community so that each project can use the technologies they want. Thats why Hardhat has a built in package manager (similar to npm), yo can find the available plugins in the [plugins page of the documentation](https://hardhat.org/plugins/). We use Ethers.js (hardhat-ethers plugin ) along with Waffle as a testing framework (@nomiclabs/hardhat-waffle plugin) which uses Mocha to structure the tests (describe, it, etc.) and Chai as an assertion library (expect, to, equal, etc.). [Complete introduction to Hardhat tutorial](https://hardhat.org/tutorial/), very recommended.

The flow for this process is:

1. Write/edit the smart contract, _smart-contracts/contracts/Contract.sol_.
2. Write/update the tests, _smart-contracts/test/Contract.js_.
3. Run the tests in a local development blockchain using Hardhat. Run the command `npx hardhat test`.

Once we have tested our smart contract in a local blockchain, its time to deploy it in a public one. There are two ways to do this:

-   Have a node of a public blockchain, Ethereum in our case, and deploy the sc through it.

-   Connect to the blockchain through a provider.

In this case we are going to use [Infura](https://infura.io), a very well known provider from the blockchain ecosystem. In order to do so we first need to sign up in the Infura platform so we can create a new project, find more information in this guide: [Getting started with Infura](https://blog.infura.io/getting-started-with-infura-28e41844cc89/). Projects in Infura help you tracking the requests made by your dApp to the network. The platform provides an APIkey and Id for the project so that every time a request gets to the provider the client has to authenticate.

Once you have created a project, you have to configure Hardhat. You can add multiple providers to the config file and Hardhat will automatically switch from one to another in case of connection loss. In the [section 7 of the Hardhat tutorial](https://hardhat.org/tutorial/deploying-to-a-live-network.html) you'll find more info about configuring a provider.

You also need to specify the target network, Rinkeby in our case, and the deployer account. For the Ethereum account (EOA) we use [Metamask](https://metamask.io/) as wallet.

In order to get some funds for the testnet you need to request them through a faucet. For the Rinkeby network you can use:

- [Rinkeby Faucet](https://faucet.rinkeby.io/) (it doesn't work usually)

- [0.001 Eth](http://rinkeby-faucet.com) (works well)

Last but not least, it is very important not to publish sensitive information like your Infura project ID or APIkey aswell as your wallet secrets. In order to avoid that we use the dotenv library to write our secrets in a local file (_.env_) that will load the info in Hardhat. In the [dotenv package description page](https://www.npmjs.com/package/dotenv) you'll find the necessary information to use it. Use _.gitignore_ to avoid tracking the file and publishing it to your git repo.

4. Write/update the deploy script, _smart-contracts/deploy/target-network.js_.
5. Prepare the .env file with APIkeys and secrets aswell as the hardhat.config.js file. Both in the _smart-contracts_ folder.
6. Deploy the smart contract. Run `npx hardhat deploy`. The resulting .json of the deploy is stored in _smart-contracts/deployments/target-network/_.


## Creating a test subgraph

[The Graph](https://thegraph.com/) is a p2p network in which nodes index events from smart contracts deployed in the Ethereum network. The Graph can be thought as a protocol to decentralize this task, therefore decentralizing some of the functionalities given by Etherscan for example read more about it in [this article](https://thegraph.com/blog/the-graph-grt-token-economics).

The first thing we need to do is to register a subgrah, this can be done thre the Subgraph Studio platform. Once the subgraph is registered we can start initializing it through the command line. Check this [guide for Publishing subgraphs in Subgraph Studio](https://thegraph.com/blog/building-with-subgraph-studio).

Una vez inicializado el proyecto debemos realizar algunas configuraciones básicas. Un detalle importante a recordar es que el subgrafo tiene un parámetro para configurar el bloque desde el que empieza a indexar, este parámetro debemos fijarlo en el bloque en el que desplegamos nuestro contrato, podemos consultar en Etherscan metiendo la dirección del contrato desplegado en el buscador de la red pertinente, en nuestro caso Rinkeby.

A continuación, definimos las entidades y funciones encargadas de indexar los datos de los eventos. En concreto, las funciones encargadas de indexar los eventos a través de entidades, se encuentran en el archivo src → mappings.ts y están escritos en AssemblyScript, una pequeña capa de abstracción sobre WebAssembly para conseguir una sintaxis más familiar. Se trata de un lenguaje en proceso de desarrollo (a Julio 2021) ya que depende totalmente de WebAssembly que también está en una fase poco madura. Por ello, a la hora de desarrollar el subgrafo es más sencillo limitarse a ejemplos ya testeados.

Finalmente obtenemos nuestro subgrafo.
