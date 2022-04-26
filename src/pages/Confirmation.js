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
    const [filas, setRows] = useState([]);    

    // const mockEmails = [
    //     'mail1@test.es',
    //     'mail2@test.es',
    //     'mail3@test.es',
    //     'mail4@test.es',
    // ]
 


    // Config variables
    const SPREADSHEET_ID = "1T6u1i32a0cQxF13EYkmvTxsUs0AGMuf2nt-FZwyBios"; //cambiar a 1w2J9DuzFHkUmBQ0zHHY51gPY7NRzmbdUV_VckSfhbSA
    const SHEET_ID = "0";
    const CLIENT_EMAIL = "p2psheet@p2psheet.iam.gserviceaccount.com";
    const PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDLBWXH7uTKt4sM\nOG730UOExGxFdPLnoUtQd7CVvvJOSpHxR2zeJuz10kfnp+Ud11Rgv/k8ABrQdrjx\nLxd9QsCi/c9bxUoeu75FKcO/4dJ2UkVfxx/s8nKlUp3SQJlC4zzbdC8AziosPOCS\nkiDf2qRp998icagmn0GEuDmf2kg0uL+YSn0Zji0k8IXk7xkKnllBMX/MeZ+JweC8\nRNK2iCfIG5gj9pVzOlONMJQKv78ulgJ3rIs/ykJFllJokvJrlZXFpJXZ10fdSINz\n7e2YS8Q9fxYVqaUys4eVrS5A3cHdM5ZAmJmqLmT4pTSYQIz//m5+E+ib1+h5XxWM\nhE7xGRqhAgMBAAECggEAAYejKey9022bFAjG9Inqja0YnSR/rfVXGMppmaPFbffJ\nsi8X8dO6k3LB6yPepgUi1gqtSkWMji2GWM4qYc2pb6L8q34E4C7ZTPpuzsbhAfZu\nTpWsstGMAc0ZyolFRGHbqhJN1j5fdstPxIf6jKBITtJ871yqlA2tOd6k48SSeKf4\nKHYWyTsusM/bmQpADu/f+8jQHfITu/YsWL3kVtgw7VRotox/KNqF1z1vAMpLPa7Y\nyiEh51XzX5bbO/XFIekTwvhtvv2KAGFSF37msDFqQKtiGGX+JzyEEQP0CFPmMl3k\nzBq0WSqXFluwEPpz8WQWQy4Ej9/mA7cOllKH6FLjAQKBgQD9NgXWH7WBuPn0kjkf\nUWbehVuaqWpojSS+TkrmhaCWgPBNJIvly7UB4a07PDdL4QdX3RHgkIhRvXKod5Qk\ntk8CprXYeT4ggUOXPbsX0BQEogrNzLlQOg0H2eWGiBsvNCrHKqJN1wXI9TE13wGi\nuhGMOZTJ5r5iEDqgdcS3qli9AQKBgQDNQdrGI8VNnRZRGLsTbqL4u0K5u/JNgAoT\n+aM+9glEcwqMQTk8DTk+KMEvDuKiAHNzCTCPMcVnNFmaMYgggdS3eulhAFrzuZ1b\noSrRdOYlyDEH4C4Kj9EoOVkNhOy+W68HCisAWo2ccfw08CbmViyQvkS1f8Z+2fuw\nS6z0rUE9oQKBgA7cCr+kILy6JEEMC7ogxs6sONH8uzfjgJKCebbJhMEQVAnS6TrV\nF4xCuC3PvNcBH7MyUAhDsxxI59+nFNSKtlxLeER56QFzVIodn0sodORItiWZrA5f\nOcCKMwQQHLhKcXA6ukejJL3EVdz5d1kbXkhCYM7wcZ/DoA0mnCLDJm4BAoGBAMul\nvij+jqCt7dlyXxItoBaGvPJIzmQkWFtvQI+UTqeSOHHluKKjQBszFlDZRPSU2/bT\ntFEugXwfDZOV90jBZ8rPcUPjtVnB3KVv52q/wCTWVgdJXoTuIgf1tixaqQVJNAQZ\nC4cjUQNaeHARoZbBAyBtFwC5ELkFD9nfi2+LgoJhAoGBAOaIZpVIX0n3g9sOekNU\noD8WnkIbz4rWP3JNqTfcVTvsUvXylI+l3fmZi54uOCmbKXqIrpvon3oLtym+EFdK\novbufT+OiJBH7u1NsnPG8e2oqkG+85D5w3mZiue4zRoR5W77TBnCirVfGQp25NZ9\nI2LcszwTJiOKKg81IS/lYweQ\n-----END PRIVATE KEY-----\n";

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

    useEffect(() => {
        const readSpreadsheet = async () => {
            try {
                await doc.useServiceAccountAuth({
                client_email: CLIENT_EMAIL,
                private_key:PRIVATE_KEY ,
            });
                // loads document properties and worksheets
                await doc.loadInfo();
        
                //const sheet = doc.sheetsById[SHEET_ID];
                const sheet = doc.sheetsByIndex[0];
                const rows = await sheet.getRows();
                setRows(rows);
        
            } catch (e) {
                console.error('Error: ', e);
            }
            };
        readSpreadsheet();
    } , []) 


    


    
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
    const datos = filas?.map((entity, i) => (
        <EntityContact
        label={entity.nombre_entidad}
        url={entity.url}
        src={entity.url_imagen}
        className={classes.entity}
        />
      ));
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
                        <Typography variant="h5" className={classes.heading3}>
                            En tu ciudad
                        </Typography>
                        
                   
                        {filas?.filter((entity) => (entity.comunidad_autonoma).includes(report.region) )
                        .map((entity, i) => (
                        <EntityContact
                        label={entity.nombre_entidad}
                        url={entity.url}
                        src={entity.url_imagen}
                        className={classes.entity}
                        />))}
                        
                        <Typography variant="h5" className={classes.heading3}>
                            Relacionados con tu profesión
                        </Typography>
                        
                         {filas?.filter((entity) => (entity.profesion_es).includes(report.profession) )
                        .map((entity, i) => (
                            <EntityContact
                        label={entity.nombre_entidad}
                        url={entity.url}
                        src={entity.url_imagen}
                        className={classes.entity}
                        />))}
                            
                    </Grid>
                </Grid>
            </Container>
        </Page>
    )
}

export default  Confirmation;

