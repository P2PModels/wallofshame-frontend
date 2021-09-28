import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { CssBaseline, Container, Paper, Grid } from '@material-ui/core'
import Page from '../components/Page'
import Chart from '../components/Chart'
import Feed from '../components/Feed'

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    fullHeight: {
        height: '100%',
    },
}))

export default function Dashboard() {
    const classes = useStyles()

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
    const fullHeightPaper = clsx(classes.paper, classes.fullHeight)

    return (
        <Page>
            <Grid container spacing={3} justify={'center'}>
                {/* Chart */}
                <Grid item xs={12} md={12} lg={8}>
                    <Paper className={fixedHeightPaper}>
                        <Chart />
                    </Paper>
                </Grid>
                {/* Feed */}
                <Grid item xs={12} md={12} lg={12}>
                    <Paper className={fullHeightPaper}>
                        <Feed />
                    </Paper>
                </Grid>
            </Grid>
        </Page>
    )
}
