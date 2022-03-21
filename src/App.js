import React, { useState }  from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Joyride, {  STATUS } from 'react-joyride';

import { steps } from "./components/Steps";

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

// import { ChainId, DAppProvider } from '@usedapp/core'

// const dAppConfig = {
//   readOnlyChainId: ChainId.Rinkeby,
//   readOnlyUrls: {
//     [ChainId.Rinkeby]: '',
//   },
//     supportedChains: [ChainId.Rinkeby],
// }





function App() {
    const [done, setDone] = useState(true)
    localStorage.setItem('done', 'true')
    //window.localStorage.setItem('tdone', true)
    if(localStorage.getItem('done') == 'false'){
        setDone(false);
    }
        return (
        
            <AppStateProvider>
                <AuthProvider>
                    <BackendProvider>
                        {/* <ApolloProviderAuth> */}
                        {/* <DAppProvider config={dAppConfig}> */}
                        <BrowserRouter>
                            <ThemeProvider theme={theme}>
                                <Header />
                                <Switch>
                                    <Route exact path="/">
                                      <div className="demo-wrapper">
                                        {console.log(done)}
                                        
                                            <Joyride
                                                continuous={true}  
                                                //disableOverlay        
                                                
                                                 callback={(data) => {
                                                    const { status } = data;

                                                    if ([STATUS.FINISHED].includes(status)) {
                                                        localStorage.setItem('done', 'false');
                                                        setDone(false);
                                                      }
                                                    if ([STATUS.SKIPPED].includes(status)) {
                                                        window.localStorage.setItem('done', 'false');
                                                        setDone(false);
                                                      }
                                                    
                                                }} 
                                                scrollToFirstStep={true} //el botoncito
                                                showProgress={true}
                                                showSkipButton={true}
                                                run = {done}
                                                //run = {window.localStorage.getItem('tdone')}
                                                steps={steps}
                                                styles={{
                                                    options: {
                                                    zIndex: 10000,
                                                    },
                                                    buttonClose: {
                                                        display: 'none',
                                                    },
                                                }}
                                            />
                                           
                                        <Landing />
                                      </div>
    
                                    </Route>
                                    <Route exact path="/info">
                                        <Info />
                                    </Route>
                                    <Route exact path="/report">
                                        <Report />
                                    </Route>
                                    <Route
                                        exact
                                        path="/confirmation"
                                        render={props => (
                                            <Confirmation {...props} />
                                        )}
                                    />
                                </Switch>
                                <Footer />
                            </ThemeProvider>
                        </BrowserRouter>
                        {/* </DAppProvider> */}
                    </BackendProvider>
                    {/* </ApolloProviderAuth> */}
                </AuthProvider>
            </AppStateProvider>
        )
    
}

export default App

