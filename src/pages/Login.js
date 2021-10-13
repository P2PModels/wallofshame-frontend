import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import Page from '../components/Page'
import LoginForm from '../components/Login/LoginForm'

const useStyles = makeStyles(theme => ({
    appBarSpacer: theme.mixins.toolbar,
    container: {
        marginTop: `${theme.spacing(8)}px`,
    },
}))

export default function Login() {
    const classes = useStyles()

    return (
        <Page className={classes.container}>
            <Grid container justify="center">
                <Grid item xs={4}>
                    <LoginForm />
                </Grid>
            </Grid>
        </Page>
    )
}
