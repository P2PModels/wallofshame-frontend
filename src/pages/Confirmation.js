import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Typography, Box } from '@material-ui/core'
import Check from '@mui/icons-material/Check'
import Page from '../components/Page'
import InfoDialog from '../components/Shared/InfoDialog'
import DisplayValue from '../components/Shared/DisplayValue'
import EmailContact from '../components/Shared/EmailContact'
import EntityContact from '../components/Shared/EntityContact'
import { useQuery } from '@apollo/client'
import { GET_FILTERED_CASES } from '../services/cases_subgraph/queries'
import { USERS } from '../services/users/queries'
import {
    professionToProfessionRenderName,
    regionToRegionRenderName,
} from '../data/config.json'

const useStyles = makeStyles(theme => ({
    title: {
        color: theme.palette.primary.main,
        fontSize: '3rem',
        fontWeight: '700',
        padding: '4rem 0 2rem',
    },
    heading2: {
        color: theme.palette.primary.main,
        fontSize: '2rem',
        fontWeight: '700',
        padding: '2rem 0 2rem',
    },
    icon: {
        display: 'inline-block',
        marginRight: '1rem',
        height: '3rem !important',
        width: '3rem !important',
    },
    caption: {
        fontSize: '1.25rem',
        display: 'inline-block',
    },
    smallCaption: {
        fontSize: '18px',
        display: 'inline-block',
        marginBottom: '1rem',
    },
    grid: {
        marginBottom: '6rem',
    },
    successMsgContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '0.5rem',
    },
    numbersContainer: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '2rem',
    },
    contactList: {
        listStyle: 'none',
    },
    entity: {
        marginLeft: '2rem',
    },
}))

export default function Confirmation(props) {
    const classes = useStyles()
    const { report } = props.location.state
    // const mockEmails = [
    //     'mail1@test.es',
    //     'mail2@test.es',
    //     'mail3@test.es',
    //     'mail4@test.es',
    // ]
    const mockEntities = [
        {
            src: './assets/smart-logo.png',
            label: 'Smart Iberia',
            url: 'https://smart.es',
        },
        {
            src: './logo192.png',
            label: 'P2P Models',
            url: 'https://p2pmodels.eu',
        },
        {
            src: './assets/smart-logo.png',
            label: 'Smart Iberia',
            url: 'https://smart.es',
        },
        {
            src: './logo192.png',
            label: 'P2P Models',
            url: 'https://p2pmodels.eu',
        },
    ]
    const regionQueryFilter = {
        region: report.region,
    }
    const professionQueryFilter = {
        profession: report.profession,
    }
    const usersQueryFilter = {
        OR: [
                {
                    region: report.region
                },
                {
                    profession: report.profession
                }
            ]
    }

    const {
        data: casesByRegion,
        loading: loadingCasesByRegion,
        error: errorCasesByRegion,
    } = useQuery(GET_FILTERED_CASES, {
        variables: {
            filter: regionQueryFilter,
        },
    })

    const {
        data: casesByProfession,
        loading: loadingCasesByProfession,
        error: errorCasesByProfession,
    } = useQuery(GET_FILTERED_CASES, {
        variables: {
            filter: professionQueryFilter,
        },
    })

    const {
        data: dataUsers,
        loading: loadingUsers,
        error: errorUsers,
    } = useQuery(USERS, {
        variables: {
            filter: JSON.stringify(usersQueryFilter),
        },
    })

    if (loadingCasesByRegion || loadingCasesByProfession || loadingUsers)
        return <Typography>Cargando datos de tu interés...</Typography>
    if (errorCasesByRegion || errorCasesByProfession || errorUsers)
        return (
            <InfoDialog
                title="Error"
                contentText={
                    errorCasesByRegion
                        ? errorCasesByRegion.message
                        : ( errorCasesByProfession 
                            ? errorCasesByProfession.message:
                            errorUsers.message )
                }
                closeButtonText="Cerrar"
            />
        )

    return (
        <Page container={false}>
            <Container maxWidth="xl">
                <Grid container className={classes.grid}>
                    <Grid item lg={8}>
                        <Typography variant="h2" className={classes.title}>
                            ¡Gracias!
                        </Typography>
                        <Box className={classes.successMsgContainer}>
                            <Check className={classes.icon} color="success" />
                            <Typography
                                variant="body1"
                                className={classes.caption}
                            >
                                Tu información se ha guardado correctamente
                            </Typography>
                        </Box>

                        <Typography
                            variant="body1"
                            className={classes.smallCaption}
                        >
                            Aquí tienes una serie de recursos que consideramos
                            podrían serte útiles
                        </Typography>
                        <Box className={classes.numbersContainer}>
                            <DisplayValue
                                value={casesByProfession.cases.length}
                                caption={`casos de 
                                ${
                                    professionToProfessionRenderName[
                                        report.profession
                                    ]
                                }`}
                            />
                            <DisplayValue
                                value={casesByRegion.cases.length}
                                caption={`casos de 
                                ${regionToRegionRenderName[report.region]}`}
                            />
                        </Box>
                        <Typography variant="h3" className={classes.heading2}>
                            Personas de contacto en tu ciudad o tu profesión
                        </Typography>
                        <Typography
                            variant="body1"
                            className={classes.smallCaption}
                        >
                            Estas personas han sufrido el mismo tipo de abuso
                            por parte de sus pagadores que tu, tal vez podáis
                            poneros en contacto y daros algún tipo de consejo.
                            Ha autorizado a dar su email así que ¡no te cortes!
                        </Typography>
                        <ul className={classes.contactList}>
                            {dataUsers.users.map((u, i) => (
                                <li>
                                    <EmailContact
                                        label={`Persona ${i + 1}`}
                                        email={u.email}
                                        key={`contacto-${i + 1}`}
                                    />
                                </li>
                            ))}
                        </ul>
                        <Typography variant="h3" className={classes.heading2}>
                            Colectivos o entidades que podrían ayudarte
                        </Typography>
                        {mockEntities.map((entity, i) => (
                            <EntityContact
                                label={entity.label}
                                url={entity.url}
                                src={entity.src}
                                className={classes.entity}
                            />
                        ))}
                    </Grid>
                </Grid>
            </Container>
        </Page>
    )
}
