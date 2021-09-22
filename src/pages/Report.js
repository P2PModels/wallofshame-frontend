import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import {
    CssBaseline,
    Container,
    Paper,
    Typography,
    Grid,
} from '@material-ui/core'
import Chart from '../components/Chart'
import Chart2 from '../components/Chart2'
import MapChart from '../components/MapChart'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
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
}))

export default function Report() {
    const classes = useStyles()

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
    const fullHeightPaper = clsx(classes.paper, classes.fullHeight)

    return (
        <div className={classes.root}>
            <CssBaseline />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
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
                            <Grid
                                item
                                xs={12}
                                lg={6}
                                className={fixedHeightPaper}
                            >
                                <Chart />
                            </Grid>
                            {/* Bar chart */}
                            <Grid
                                item
                                xs={12}
                                lg={6}
                                className={fixedHeightPaper}
                            >
                                <Chart2 />
                            </Grid>
                            {/* Simple maps map */}
                            <Grid
                                item
                                xs={12}
                                lg={6}
                                className={fixedHeightPaper}
                            >
                                <MapChart />
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </main>
        </div>
    )
}
