import { createContext } from 'react'

const appInitialContext = {
    state: {
        loggedIn: false,
    },
    actions: {
        signup: () => {},
        login: () => {},
    },
}

const AppContext = createContext(appInitialContext)
