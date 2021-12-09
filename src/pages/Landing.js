import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import Dashboard from '../components/Dashboard'
import Map from '../components/Map'
import Page from '../components/Page'

const useStyles = makeStyles(theme => ({
    map: {
        height: '80vh',
        width: '100vw',
        marginBottom: theme.spacing(2),
    },
}))

export default function Landing() {
    const classes = useStyles()

    return (
        <Page container={false}>
            {/* Map */}
            <Map className={classes.map} />
    
            {/* Dashboard */}
            <Container maxWidth='xl'>
                <Dashboard />  
            </Container>
        </Page>
    )
}
