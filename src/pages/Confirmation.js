import React, { useState, useEffect } from 'react'
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
import { GoogleSpreadsheet } from "google-spreadsheet";
import {
    professionToProfessionRenderName,
    regionToRegionRenderName,
} from '../data/config.json'
import { setQuarter } from 'date-fns'

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
    heading3: {
        color: theme.palette.secondary.main,
        fontSize: '1.5rem',
        fontWeight: '700',
        padding: '2rem 3rem 1rem',
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
    captionOrg: {
        fontSize: '1.25rem',
        display: 'inline-block',
        padding: '2rem 3rem 1rem',
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

//export default function Confirmation(props) {
const Confirmation = (props) => {
    const classes = useStyles()
    const { report } = props.location.state
    const [filas, setRows] = useState([])    


    // Config variables
    // const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID
    const CLIENT_EMAIL =  process.env.REACT_APP_CLIENT_EMAIL
    const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY

    console.log("env vars: ")
    console.log(CLIENT_EMAIL)
    // console.log(SPREADSHEET_ID)
    console.log(PRIVATE_KEY)

    const doc = new GoogleSpreadsheet('1w2J9DuzFHkUmBQ0zHHY51gPY7NRzmbdUV_VckSfhbSA')

    useEffect(() => {
        const readSpreadsheet = async () => {
            try {
                await doc.useServiceAccountAuth({
                client_email: CLIENT_EMAIL,
                private_key:PRIVATE_KEY ,
            });
                // loads document properties and worksheets
                await doc.loadInfo();
        
                //const sheet = doc.sheetsById[SHEET_ID]
                const sheet = doc.sheetsByIndex[0]
                const rows = await sheet.getRows()
                setRows(rows);
        
            } catch (e) {
                console.error('Error: ', e)
            }
            };
        readSpreadsheet();
    } , []) 


    const regionQueryFilter = {
        region: report[0].region,
    }
    const professionQueryFilter = {
        profession: report[0].profession,
    }

    const emailQueryFilter = {
        email: report[1],
    }
    
    const usersQueryFilter = {
        OR: [
                {
                    region: report[0].region
                },
                {
                    profession: report[0].profession
                },
                {
                    email: report[1]
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
    const datos = filas?.map((entity, i) => (
        <EntityContact
            label={entity.nombre_entidad}
            url={entity.url}
            src={entity.url_imagen}
            className={classes.entity}
        />
      ));

    console.log("Filas")
    console.log(filas)
    const orgsCiudad = filas?.filter((entity) => (entity.comunidad_autonoma).includes(report[0].region) || (entity.comunidad_autonoma) == ("Todas" || "Internacional"))
    const orgsProfesion = filas?.filter((entity) => (entity.profesion_es).includes(report[0].profession) )
    const userMails = dataUsers.users.filter((u) => (u.email != report[1])) 

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
                                Tu información se ha guardado correctamente. <br /> Cuando vuelvas a la página principal recuerda recargar para ver tu caso en el mapa.
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
                                        report[0].profession
                                    ]
                                }`}
                            />
                            <DisplayValue
                                value={casesByRegion.cases.length}
                                caption={`casos de 
                                ${regionToRegionRenderName[report[0].region]}`}
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
                
                            {(userMails.length>0) ? (
                                userMails.slice(0,5).map((u, i) => (
                                    <li>
                                        <EmailContact
                                            label={`Persona ${i + 1}`}
                                            email={u.email}
                                            key={`contacto-${i + 1}`}
                                        />
                                    </li>
                                )                                )
                            ) :(
                                <Typography variant="subtitle"  className={classes.captionOrg}>
                                    No tenemos emails para ti actualmente
                                </Typography>
                                
                            )}
                        </ul>
                        
                        <Typography variant="h3" className={classes.heading2}>
                            Colectivos o entidades que podrían ayudarte 
                        </Typography>
                        <Typography variant="h5" className={classes.heading3}>
                            En tu ciudad
                        </Typography>
                        {(orgsCiudad.length>0) ? (
                            orgsCiudad.map((entity, i) => (
                                <EntityContact
                                    label={entity.nombre_entidad}
                                    url={entity.url}
                                    src={entity.url_imagen}
                                    className={classes.entity}
                                />
                            ))
                        ) :(
                            <Typography variant="subtitle"  className={classes.captionOrg}>
                                No tenemos organizaciones registradas en tu Comunidad Autónoma, pero si encuentras alguna contáctanos
                            </Typography>
                        )}

                            
                        <Typography variant="h5" className={classes.heading3}>
                            Relacionados con tu profesión
                        </Typography>
                        
                        {(orgsProfesion.length>0) ? (
                            orgsProfesion.map((entity, i) => (
                                <EntityContact
                                    label={entity.nombre_entidad}
                                    url={entity.url}
                                    src={entity.url_imagen}
                                    className={classes.entity}
                                />
                            ))
                        ) :(
                            <Typography variant="subtitle"  className={classes.captionOrg}>
                                No tenemos organizaciones registradas relacionadas con tu profesión, pero si encuentras alguna contáctanos
                            </Typography>
                            
                        )}
                            
                    </Grid>
                </Grid>
            </Container>
        </Page>
    )
}

export default  Confirmation;

