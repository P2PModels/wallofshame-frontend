import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './App.css'
import { ThemeProvider } from '@material-ui/core/styles'

// import { AppStateProvider } from './contexts/AppState'

import ProvideAuth from './providers/Auth/provider'

import PrivateRoute from './components/PrivateRoute'
import Report from './pages/Report'
import Dashboard from './pages/Dashboard'
import IssueBadge from './pages/IssueBadge'
import Login from './pages/Login'

import Header from './components/shared/Header'
import Footer from './components/shared/Footer'

import theme from './themes/smart'

import config from './config.json'

import { ChainId, DAppProvider } from '@usedapp/core'

const dAppConfig = {
    //   readOnlyChainId: ChainId.Rinkeby,
    //   readOnlyUrls: {
    //     [ChainId.Rinkeby]: '',
    //   },
    supportedChains: [ChainId.Rinkeby],
}

const client = new ApolloClient({
    // Use for fetching from back-end
    uri: config.gql.localhost,
    // Use when fetching from The Graph
    // uri: config.gql.theGraphDev,
    cache: new InMemoryCache(),
})

function App() {
    return (
        // <AppStateProvider>
        <ApolloProvider client={client}>
            <DAppProvider config={dAppConfig}>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <ProvideAuth>
                            <Header />
                            <Switch>
                                <Route exact path="/">
                                    <Report />
                                </Route>
                                <Route exact path="/badges">
                                    <Dashboard />
                                </Route>
                                <PrivateRoute exact path="/issue-badge">
                                    <IssueBadge />
                                </PrivateRoute>
                                <Route exact path="/login">
                                    <Login />
                                </Route>
                            </Switch>
                            <Footer />
                        </ProvideAuth>
                    </ThemeProvider>
                </BrowserRouter>
            </DAppProvider>
        </ApolloProvider>
        // </AppStateProvider>
    )
}

export default App
