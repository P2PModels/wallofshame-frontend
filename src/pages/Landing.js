import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import Dashboard from '../components/Dashboard'
import Map from '../components/Map'
import Page from '../components/Page'
import { CasesProvider } from '../providers/CasesProvider/provider'

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
                <Container  maxWidth="xl">
                    <Dashboard />
                </Container>
            </CasesProvider>
        </Page>
    )
}
