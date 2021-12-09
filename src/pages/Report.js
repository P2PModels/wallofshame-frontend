import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Typography, Grid } from '@material-ui/core'
import Chart from '../components/Chart'
import Chart2 from '../components/Chart2'
import Map from '../components/Map'
import Page from '../components/Page'

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(6),
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 340,
    },
    fullHeight: {
        height: '100%',
    },
    map: {
        height: '500px',
        width: '100%',
    },
}))

export default function Report() {
    const classes = useStyles()

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
    const fullHeightPaper = clsx(classes.paper, classes.fullHeight)

    return (
        <Page>
            <Paper className={fullHeightPaper}>
                <Grid container spacing={3} justify={'center'}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Typography
                            component="h1"
                            variant="h1"
                            className={classes.title}
                        >
                            Informe Indaga
                        </Typography>
                    </Grid>
                    {/* Chart */}
                    <Grid item xs={12} lg={6} className={fixedHeightPaper}>
                        <Chart />
                    </Grid>
                    {/* Bar chart */}
                    <Grid item xs={12} lg={6} className={fixedHeightPaper}>
                        <Chart2 />
                    </Grid>
                    {/* Leaflet map */}
                    <Grid item xs={12}>
                        <Map className={classes.map} />
                    </Grid>
                </Grid>
            </Paper>
        </Page>
    )
}
