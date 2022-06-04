import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import Dashboard from '../components/Dashboard'
import Map from '../components/Map'
import Page from '../components/Page'

const useStyles = makeStyles(theme => ({
    map: {
        height: '80vh',
        maxWidth: '100vw',
        marginBottom: theme.spacing(2),
        position: 'relative',
        '& .marker-cluster-medium': {
            backgroundColor: 'rgba(110,204,57,0.2) !important'
        },
        '& .marker-cluster > div': {
            backgroundColor: 'rgba(110,204,57,0.6) !important'
        }
    },
}))

export default function Landing() {
    const classes = useStyles()

    return (
        <Page container={false}>
            <div className="map">
            {/* <CasesProvider cases={data.cases}> */}
            {/* Map */}
                <Map className={classes.map}/> 
            </div>
            {/* Dashboard */}
            <Container  maxWidth="xl">
                <Dashboard />
            </Container>
        </Page>
    )
}
