import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import Dashboard from '../components/Dashboard'
import Map from '../components/Map'
import Page from '../components/Page'
import { CasesProvider } from '../providers/CasesProvider/provider'
import { steps } from "../components/Steps";
import Joyride from "react-joyride";

const useStyles = makeStyles(theme => ({
    map: {
        height: '80vh',
        maxWidth: '100vw',
        marginBottom: theme.spacing(2),
        position: 'relative',
    },
}))

export default function Landing() {
    const classes = useStyles()

    return (
        <Page container={false}>
            <CasesProvider>
                <div className="map">
                {/* <CasesProvider cases={data.cases}> */}
                {/* Map */}
                    <Map className={classes.map}/> 
                </div>
                {/* Dashboard */}
                <div className="dashboard">
                    <Container  maxWidth="xl">
                        <Dashboard />
                    </Container>
                </div>
            </CasesProvider>
        </Page>
    )
}
