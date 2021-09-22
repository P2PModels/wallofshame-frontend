import { createContext, useContext } from 'react'

const appState = {
  web3Provider: {},
  setWeb3Provider: () => {},
  web3Signer: {},
  setWeb3Sginer: () => {},
  contractsInstances: [],
  intantiateContract: () => {},
}

const AppStateContext = createContext()

export function AppStateProvider({ children }) {

    return (
      <AppStateContext.Provider value={appState}>
        {children}
      </AppStateContext.Provider>
    )
}

export function useAppState() {
  const context = useContext(AppStateContext)

  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider')
  }

  return context
}
