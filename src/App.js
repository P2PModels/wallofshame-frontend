import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './App.css'
import { ThemeProvider } from '@material-ui/core/styles'

import { AppStateProvider } from './providers/AppStateProvider/provider'

import AuthProvider from './providers/Auth/provider'
// import ApolloProviderAuth from './components/ApolloProviderAuth'
import BackendProvider from './components/BackendProvider'
import Landing from './pages/Landing'
import Info from './pages/Info'
import Confirmation from './pages/Confirmation'
import Report from './pages/Report'

import Header from './components/Shared/Header'
import Footer from './components/Shared/Footer'

import theme from './themes/smart'

import { ChainId, DAppProvider } from '@usedapp/core'

const dAppConfig = {
    //   readOnlyChainId: ChainId.Rinkeby,
    //   readOnlyUrls: {
    //     [ChainId.Rinkeby]: '',
    //   },
    supportedChains: [ChainId.Rinkeby],
}

function App() {
    return (
        <AppStateProvider>
            <AuthProvider>
                <BackendProvider>
                    {/* <ApolloProviderAuth> */}
                    <DAppProvider config={dAppConfig}>
                        <BrowserRouter>
                            <ThemeProvider theme={theme}>
                                <Header />
                                <Switch>
                                    <Route exact path="/">
                                        <Landing />
                                    </Route>
                                    <Route exact path="/info">
                                        <Info />
                                    </Route>
                                    <Route exact path="/report">
                                        <Report />
                                    </Route>
                                    <Route exact path="/confirmation">
                                        <Confirmation />
                                    </Route>
                                </Switch>
                                <Footer />
                            </ThemeProvider>
                        </BrowserRouter>
                    </DAppProvider>
                </BackendProvider>
                {/* </ApolloProviderAuth> */}
            </AuthProvider>
        </AppStateProvider>
    )
}

export default App
