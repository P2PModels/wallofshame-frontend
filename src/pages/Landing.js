import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Grid } from '@material-ui/core'
import Map from '../components/Map'
import Page from '../components/Page'
import Title from '../components/Title'

const useStyles = makeStyles(theme => ({
    map: {
        height: '500px',
        width: '100%',
    },
}))

export default function Landing() {
    const classes = useStyles()


    return (
        <Page>
            <Grid container spacing={3} justify={'center'}>
                {/* Map */}
                <Grid item xs={12}>
                    <Paper>
                        <Map className={classes.map} />

                    </Paper>
                </Grid>
                {/* Dashboard */}
                <Grid item xs={12}>
                    <Paper>
                        <Title>Dashboard</Title>  
                    </Paper>
                </Grid>
            </Grid>
        </Page>
    )
}
