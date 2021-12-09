import React from 'react'
import { Paper, Grid } from '@material-ui/core'
import Page from '../components/Page'
import Title from '../components/Title'

export default function Landing() {

    return (
        <Page>
            <Grid container spacing={3} justify={'center'}>
                {/* Map */}
                <Grid item xs={12}>
                    <Paper>
                        <Title>Map</Title>
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
