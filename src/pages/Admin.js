import { React, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, DataGrid, Typography, Icon } from '@material-ui/core'
import CircularProgress from '@mui/material/CircularProgress';
import Page from '../components/Page'
import { CasesProvider } from '../providers/CasesProvider/provider'
import DropZone from '../components/DropZone'
import Controls from '../components/Shared/controls/Controls'
import clsx from 'clsx'
import DenseTable from '../components/DenseTable'
import { Warning, Check, Error } from '@material-ui/icons'
import useRestart from '../hooks/useRestart'
import useBulkReport from '../hooks/useBulkReport'

const useStyles = makeStyles(theme => ({
    mainGrid: {
        marginTop: '2rem',
    },
    formButton: {
        display: 'block',
        boxShadow: 'none',
        borderRadius: 0,
        color: theme.palette.text.light,
    },
    mb: {
        marginBottom: theme.spacing(2)
    },
    loadingSpinner: {
        color: theme.palette.primary.main,
        display: 'grid',
        gridAutoFlow: 'column',
        alignItems: 'center',
        justifyItems: 'center',
        margin: '7rem auto 0rem',

    },
    loadingText1: {
        color: theme.palette.primary.main,
        fontSize: '2rem',
        fontWeight: '400',
        padding: '2rem 0 0rem',
        margin: '2rem 0 0rem',
        textAlign:'center',
       
    },
    loadingText2: {
        color: theme.palette.primary.main,
        fontSize: '1rem',
        fontWeight: '400',
        padding: '0rem 0 2rem',
        margin: '1rem 0 2rem',
        textAlign:'center',
    },
    flexColumn:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    }
}))

export default function Admin() {
    const classes = useStyles()
    const [cases, setCases] = useState(null)
    const [casesHeaders, setCasesHeaders] = useState([])
    const [ restartContract, {data: restartData, loading: restartLoading, error: restartError} ] = useRestart()
    const [ bulkReport , {data, loading, error} ] = useBulkReport()

    // console.log("[Admin] Cases loaded from drop zone: ")
    // console.log(cases)

    useEffect(() => {
        if(loading){
            console.log("[Admin] Bulk report in progress...")
        }
        if(error){
            console.log("[Admin] Bulk report error:")
            console.log(error)
        }
        if(data){
            console.log("[Admin] Update:")
            console.log(data)
        }
    }, [data, loading, error])
    

    if (restartLoading) return (
        //<Box position="relative" display="inline-flex">
        <Page container={false}>
            <Grid item  lg={12} className = {classes.flexColumn}>
                <CircularProgress size={44} color="inherit"  className = {classes.loadingSpinner}/>  
                <Typography className={classes.loadingText1}>
                    Reiniciando...                                    
                </Typography>
                <Typography className={classes.loadingText2}>
                    Este proceso puede tardar unos segundos...                                    
                </Typography>               
            </Grid> 
        </Page>
    )

    if (restartError) {
        console.log(restartError)
        return (
            <Page container={false}>
                <Grid item  lg={12} className = {classes.flexColumn}>
                    <Typography className={classes.loadingText1}>
                        Error!                                    
                    </Typography>
                    <Typography className={classes.loadingText2}>
                        {restartError}                                    
                    </Typography> 
                </Grid>  
            </Page>
        )
    }

    return (
        <Page container={false}>
            <CasesProvider>
                <Container  maxWidth="xl">
                    <Grid container spacing={2} className={classes.mainGrid}>
                        <Grid item xs={12}>
                            <Typography variant="h1" align='center'>Administrar prototipo</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h2" className={classes.mb} >Carga múltiple de casos</Typography>
                            <Typography variant="body1" className={classes.mb} >Arrastra un documento en formato csv. El documento (normalmente exportado desde una hoja de cálculo) debe contener una primera fila con las siguientes etiquetas de columna: companyName, caseType, description, region, profession, gender, ageRange, experience, terms, email. El resto de filas serán los datos correspondientes a cada una de las entradas a reportar.</Typography>
                            <DropZone setDataEntries={setCases} setDataHeaders={setCasesHeaders} className={classes.mb} />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h2" className={classes.mb} ><Warning /> Reiniciar prototipo</Typography>
                            <Typography variant="body1" className={classes.mb} > Se eliminarán todos los casos del contrato, se reiniciarán estadísticas y se limpiará la base de datos de usuarios de contacto.</Typography>
                            <Controls.Button 
                                type="submit"
                                text="REINICIAR"
                                onClick={restartContract}
                                className={clsx(classes.mb,classes.formButton)}
                            />
                            { restartData ? (
                                    <Typography variant="body1" className={classes.mb}>
                                        Reiniciado: {restartData.restart.connected ? <Check /> : <Error />}                                   
                                    </Typography> 
                                                                           

                                ) : null
                            }
                        </Grid>
                        {cases === null ? null : ( 
                            <Grid item xs={12}>
                                <Controls.Button 
                                    type="submit"
                                    text="CARGA MÚLTIPLE"
                                    onClick={() => {
                                        console.log("[Admin] Cases: ")
                                        console.log(cases)
                                        bulkReport(cases)
                                    }}
                                    className={clsx(classes.mb,classes.formButton)}
                                />
                                <DenseTable headers={casesHeaders} dataset={cases} /> 
                            </Grid>
                        )}
                    </Grid>
                </Container>
            </CasesProvider>
        </Page>
    )
}
