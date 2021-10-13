import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import Page from '../components/Page'

const useStyles = makeStyles(theme => ({
    appBarSpacer: theme.mixins.toolbar,
    container: {
        marginTop: `${theme.spacing(8)}px`,
    },
}))

export default function Logout() {
    const classes = useStyles()

    return (
        <Page className={classes.container}>
            <Grid container justify="center">
                <Grid item xs={4}>
                    <Typography component="h1" variant="h3">
                        Succesfully logged out!
                    </Typography>
                </Grid>
            </Grid>
        </Page>
    )
}
