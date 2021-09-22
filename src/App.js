import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './App.css'
import { ThemeProvider } from '@material-ui/core/styles'

import { AppStateProvider } from './contexts/AppState'

import Report from './pages/Report'
import Dashboard from './pages/Dashboard'
import IssueBadge from './pages/IssueBadge'

import Header from './components/shared/Header'
import Footer from './components/shared/Footer'

import theme from './themes/smart'

import config from './config.json'

import { ChainId, DAppProvider } from '@usedapp/core'
import Login from './pages/Login'

const dAppConfig = {
    //   readOnlyChainId: ChainId.Rinkeby,
    //   readOnlyUrls: {
    //     [ChainId.Rinkeby]: '',
    //   },
    supportedChains: [ChainId.Rinkeby],
}

const client = new ApolloClient({
    uri: config.gql.theGraphDev,
    cache: new InMemoryCache(),
})

function App() {
    return (
        <AppStateProvider>
            <ApolloProvider client={client}>
                <DAppProvider config={dAppConfig}>
                    <BrowserRouter>
                        <ThemeProvider theme={theme}>
                            <Header />
                            <Switch>
                                <Route exact path="/">
                                    <Report />
                                </Route>
                                <Route exact path="/badges">
                                    <Dashboard />
                                </Route>
                                <Route exact path="/issue-badge">
                                    <IssueBadge />
                                </Route>
                                <Route exact path="/login">
                                    <Login />
                                </Route>
                            </Switch>
                            <Footer />
                        </ThemeProvider>
                    </BrowserRouter>
                </DAppProvider>
            </ApolloProvider>
        </AppStateProvider>
    )
}

export default App
