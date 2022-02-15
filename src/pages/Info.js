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

export default function Info() {
    const classes = useStyles()

    return (
        <Page container={false}>
            <Container maxWidth="xl">
                <Grid container className={classes.grid}>
                    <Grid item lg={6}>
                        <Typography variant="h2" className={classes.title}>
                            ¿Qué es?
                        </Typography>
                        <Typography variant="body1" className={classes.caption}>
                            El Observatorio de la Precariedad en el Sector Cultural es una <b>iniciativa del grupo de investigación del proyecto P2P Models</b> de la Universidad Complutense de Madrid. El proyecto <b>nace como respuesta a la situación precaria que afecta el sector cultural español</b>, el cual se ha visto gravemente afectado por los continuos recortes en el sector público. Aunque genera el 3,7% del PIB total, el sector cultural y artístico solamente recibe alrededor del 0,43% de la financiación de la Administración Pública española. En este contexto, lxs trabajadorxs culturales luchan cada vez más por sobrevivir a la crisis económica. 
                        </Typography>
                        <Typography variant="h2" className={classes.title}>
                            ¿Qué hacemos?
                        </Typography>
                        <Typography variant="body1" className={classes.caption}>
                            El Observatorio está pensado como una <b>plataforma interactiva de visualización de datos</b> sobre las condiciones actuales de los trabajadores, y proporcionando más visibilidad a la problemática de la precariedad de los trabajadores culturales. Al mismo tiempo, la plataforma <b>permite a lxs usuarixs crear redes</b> entre ellxs y llegar a entidades de ayuda tras hacer pública su denuncia. Además, a través de los datos proporcionados por lxs usuarixs, la plataforma tiene el objetivo de visibilizar las diferencias salariales en función del género, la ubicación y el tipo de profesión. Idealmente, esto puede servir a la elaboración de reivindicaciones políticas en torno a la precariedad. 
                        </Typography>
                        <Typography variant="h2" className={classes.title}>
                            ¿Por qué blockchain?
                        </Typography>
                        <Typography variant="body1" className={classes.caption}>
                            El Observatorio busca proteger la privacidad de los denunciantes y el uso de sus datos personales por medio de la plataforma también utiliza la tecnología blockchain para almacenar las denuncias buscando de esta manera evitar potenciales censuras al contenido (contrariamente a lo que sucede en todas las plataformas centralizadas, como Instagram y Twitter, en que el control del contenido siempre queda en manos de los dueños). Mediante el empleo de blockchain, estamos devolviendo a lxs usuarixs el control sobre el contenido que publican.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    )
}
