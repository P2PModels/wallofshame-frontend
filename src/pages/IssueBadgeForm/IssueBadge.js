import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    CssBaseline,
    Container,
    Box,
    Typography,
    Grid,
} from '@material-ui/core'
import IssueBadgeForm from './IssueBadgeForm'
import MetamaskButton from '../../components/MetamaskButton'

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
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    flexItemEnd: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
}))

export default function IssueBadge() {
    const classes = useStyles()

    return (
        <div>
            <CssBaseline />
            <main>
                <div className={classes.appBarSpacer} />
                <Box className={classes.titleContainer}>
                    <Grid
                        container
                        className={classes.titleGrid}
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item>
                            <Typography
                                component="h1"
                                variant="h3"
                                className={classes.title}
                            >
                                Formulario de emisión de sellos
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container justify="space-between">
                        <Grid item xs={8}>
                            <Typography component="p" variant="h5" gutterBottom>
                                Por favor, completa el siguiente formulario para
                                emitir un sello
                            </Typography>
                            <IssueBadgeForm />
                        </Grid>
                        <Grid item xs={3} className={classes.flexItemEnd}>
                            <MetamaskButton />
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    )
}
