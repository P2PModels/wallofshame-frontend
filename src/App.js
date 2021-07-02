import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import { ThemeProvider } from '@material-ui/core/styles'

import Dashboard from './pages/Dashboard'
import AddNonPayment from './pages/AddNonPayment/AddNonPayment'

import Header from './components/shared/Header'
import Footer from './components/shared/Footer'

import theme from './themes/smart'

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Header />
                <Switch>
                    <Route exact path="/">
                        <Dashboard></Dashboard>
                    </Route>
                    <Route exact path="/add-non-payment">
                        <AddNonPayment></AddNonPayment>
                    </Route>
                </Switch>
                <Footer />
            </ThemeProvider>
        </BrowserRouter>
    )
}

export default App
