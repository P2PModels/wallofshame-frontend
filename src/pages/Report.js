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
        height: 240,
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
                    <Grid container spacing={3} justify={'center'}>
                        {/* Chart */}
                        <Grid item xs={12} md={12} lg={8}>
                            <Paper className={fixedHeightPaper}>
                                <Typography
                                    component="h1"
                                    variant="h1"
                                    className={classes.title}
                                >
                                    Informe Indaga
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    )
}
