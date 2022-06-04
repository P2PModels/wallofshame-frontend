import React, { useState }  from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Joyride, {  STATUS } from 'react-joyride';

import { steps } from "./components/Steps";

import './App.css'
import { ThemeProvider } from '@material-ui/core/styles'

import { AppStateProvider } from './providers/AppStateProvider/provider'

import { CasesProvider } from './providers/CasesProvider/provider'
// import ApolloProviderAuth from './components/ApolloProviderAuth'
import BackendProvider from './components/BackendProvider'
import Landing from './pages/Landing'
import Admin from './pages/Admin'
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
    const [notDone, setnotDone] = useState(true)
    
    //window.localStorage.setItem('notDone', true)
    if(localStorage.getItem('notDone') == 'false'){
        localStorage.setItem('notDone','false');
    }
    else {localStorage.setItem('notDone', 'true')}

    return (
    
        <AppStateProvider>
            <BackendProvider>
                <CasesProvider>
                    {/* <ApolloProviderAuth> */}
                    {/* <DAppProvider config={dAppConfig}> */}
                    <BrowserRouter>
                        <ThemeProvider theme={theme}>
                            <Header />
                            <Switch>
                                <Route exact path="/">
                                <div className="demo-wrapper">
                                    
                                        <Joyride
                                            continuous={true}  
                                            //disableOverlay        
                                            
                                            callback={(data) => {
                                                const { status } = data;

                                                if ([STATUS.FINISHED].includes(status) || [STATUS.SKIPPED].includes(status)) {
                                                    localStorage.setItem('notDone', 'false');
                                                    setnotDone(false);
                                                } 
                                                
                                            }} 
                                            scrollToFirstStep={true} //el botoncito
                                            showProgress={true}
                                            showSkipButton={true}
                                            run = {localStorage.getItem('notDone') == 'true' ? (true):(false)}
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
                                <Route exact path="/admin">
                                    <Admin />
                                </Route>
                            </Switch>
                            <Footer />
                        </ThemeProvider>
                    </BrowserRouter>
                    {/* </DAppProvider> */}
                </CasesProvider>
                {/* </ApolloProviderAuth> */}
            </BackendProvider>
        </AppStateProvider>
    )

}

export default App

