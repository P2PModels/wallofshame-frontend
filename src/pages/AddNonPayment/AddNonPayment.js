import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    CssBaseline,
    Container,
    Box,
    Typography,
    Grid,
} from '@material-ui/core'
import AddNonPaymentForm from './AddNonPaymentForm'

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
}))

export default function AddNonPayment() {
    const classes = useStyles()

    return (
        <div>
            <CssBaseline />
            <main>
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
                                Unpaid invoices form to fill by Smart Core team
                                members
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container>
                        <Grid item xs={8}>
                            <Typography component="p" variant="h5" gutterBottom>
                                Por favor, completa el siguiente formulario para
                                guardar una factura como impagada
                            </Typography>
                            <AddNonPaymentForm />
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    )
}
