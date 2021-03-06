// TODO: Set rpc urls as private env variables.
const RPC_URLS = {
  mainnet: 'INFURA_MAINNET_URL',
  rinkeby: 'INFURA_RINKEBY_URL',
}

// const INSTANCE = process.env.REACT_APP_DBADGE_INSTANCE

// Staging configuration
const STAGING_CHAIN_ID = 4

// Network data taken from https://github.com/ethereum-lists/chains/tree/master/_data/chains
const networks = {
  1: {
    name: 'Mainnet',
    chain: 'ETH',
    network: 'mainnet',
    rpc: [`https://mainnet.infura.io/v3/${RPC_URLS.mainnet}`],
    faucets: [],
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    infoURL: 'https://ethereum.org',
    shortName: 'eth',
    chainId: 1,
    networkId: 1,
    slip44: 60,
    ens: {
      registry: '0x314159265dd8dbb310642f98f50c066173c1259b',
    },
  },
  4: {
    name: 'Rinkeby',
    chain: 'ETH',
    network: 'rinkeby',
    rpc: [`https://rinkeby.infura.io/v3/${RPC_URLS.rinkeby}`],
    faucets: ['https://faucet.rinkeby.io'],
    nativeCurrency: {
      name: 'Rinkeby Ether',
      symbol: 'RIN',
      decimals: 18,
    },
    infoURL: 'https://www.rinkeby.io',
    shortName: 'rin',
    chainId: 4,
    networkId: 4,
    ens: {
      registry: '0xe7410170f87102df0055eb195163a03b7f2bff4a',
    },
  },
}

function getDefaultChainId(instance) {
  if (instance === 'staging') return STAGING_CHAIN_ID
}

export function getNetwork(chainId = getDefaultChainId(INSTANCE)) {
  return networks[chainId]
}
