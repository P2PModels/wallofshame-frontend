import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    CssBaseline,
    Container,
    Box,
    Typography,
    Grid,
} from '@material-ui/core'
import LoginForm from '../components/Login/LoginForm'
// import MetamaskButton from '../../components/MetamaskButton'

const useStyles = makeStyles(theme => ({
    appBarSpacer: theme.mixins.toolbar,
    titleContainer: {
        width: '100%',
        height: theme.spacing(10),
        position: 'relative',
        '&::before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundImage: 'url("https://picsum.photos/1600/300")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            opacity: '0.3',
            zIndex: -1,
        },
    },
    titleGrid: {
        height: '100%',
    },
    title: {
        color: theme.palette.text.dark,
        font: 'IBM Plex Mono Regular',
    },
    main: {
        height: '100vh',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        height: '100%',
    },
}))

export default function IssueBadge() {
    const classes = useStyles()

    return (
        <div>
            <CssBaseline />
            <main className={classes.main}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container justify="center">
                        <Grid item xs={8}>
                            <LoginForm />
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    )
}
