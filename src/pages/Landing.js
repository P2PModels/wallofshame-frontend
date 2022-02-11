import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Typography } from '@material-ui/core'
import Dashboard from '../components/Dashboard'
import Map from '../components/Map'
import Page from '../components/Page'
import { CasesProvider } from '../providers/CasesProvider/provider'
// import { useQuery } from '@apollo/client'
// import { GET_CASES } from '../services/cases/queries'

const useStyles = makeStyles(theme => ({
    map: {
        height: '80vh',
        maxWidth: '100vw',
        marginBottom: theme.spacing(2),
    },
}))

export default function Landing() {
    const classes = useStyles()

    // const { data, loading, error } = useQuery(GET_CASES)

    return (
        <Page container={false}>
            <CasesProvider>
                {/* <CasesProvider cases={data.cases}> */}
                {/* Map */}
                <Map className={classes.map} />
                {/* Dashboard */}
                <Container maxWidth="xl">
                    <Dashboard />
                </Container>
            </CasesProvider>
        </Page>
    )
}
