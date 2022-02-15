import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Typography } from '@material-ui/core'
import Page from '../components/Page'

const useStyles = makeStyles(theme => ({
    title: {
        color: theme.palette.primary.main,
        fontSize: '3rem',
        fontWeight: '700',
        padding: '4rem 0 2rem',
    },
    caption: {
        fontSize: '1.25rem',
    },
    grid: {
        marginBottom: '6rem',
    }
}))

export default function Confirmation() {
    const classes = useStyles()

    return (
        <Page container={false}>
            <Container maxWidth="xl">
                <Grid container className={classes.grid}>
                    <Grid item lg={6}>
                        <Typography variant="h2" className={classes.title}>
                            Confirmation
                        </Typography>
                        <Typography variant="body1" className={classes.caption}>
                            El Observatorio de la Precariedad en el Sector Cultural es una <b>iniciativa del grupo de investigación del proyecto P2P Models</b> de la Universidad Complutense de Madrid. El proyecto <b>nace como respuesta a la situación precaria que afecta el sector cultural español</b>, el cual se ha visto gravemente afectado por los continuos recortes en el sector público. Aunque genera el 3,7% del PIB total, el sector cultural y artístico solamente recibe alrededor del 0,43% de la financiación de la Administración Pública española. En este contexto, lxs trabajadorxs culturales luchan cada vez más por sobrevivir a la crisis económica. 
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    )
}
