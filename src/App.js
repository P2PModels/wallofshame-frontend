import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './App.css'
import { ThemeProvider } from '@material-ui/core/styles'

// import { AppStateProvider } from './contexts/AppState'

import AuthProvider from './providers/Auth/provider'
import ApolloProviderAuth from './components/ApolloProviderAuth'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './pages/Dashboard'
import Landing from './pages/Landing'
import IssueBadge from './pages/IssueBadge'
import Login from './pages/Login'

import Header from './components/Shared/Header'
import Footer from './components/Shared/Footer'

import theme from './themes/smart'

import { ChainId, DAppProvider } from '@usedapp/core'
import Logout from './pages/Logout'

const dAppConfig = {
    //   readOnlyChainId: ChainId.Rinkeby,
    //   readOnlyUrls: {
    //     [ChainId.Rinkeby]: '',
    //   },
    supportedChains: [ChainId.Rinkeby],
}

function App() {
    return (
        // <AppStateProvider>
        <AuthProvider>
            <ApolloProviderAuth>
                <DAppProvider config={dAppConfig}>
                    <BrowserRouter>
                        <ThemeProvider theme={theme}>
                            <Header />
                            <Switch>
                                <Route exact path="/">
                                    <Landing />
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
                                <Route exact path="/logout">
                                    <Logout />
                                </Route>
                            </Switch>
                            <Footer />
                        </ThemeProvider>
                    </BrowserRouter>
                </DAppProvider>
            </ApolloProviderAuth>
        </AuthProvider>
        // </AppStateProvider>
    )
}

export default App
