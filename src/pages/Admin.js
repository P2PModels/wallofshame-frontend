import { React, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, DataGrid, Typography, Icon } from '@material-ui/core'
import Page from '../components/Page'
import { CasesProvider } from '../providers/CasesProvider/provider'
import DropZone from '../components/DropZone'
import Controls from '../components/Shared/controls/Controls'
import clsx from 'clsx'
import DenseTable from '../components/DenseTable'
import { Warning } from '@material-ui/icons'

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
    }
}))

export default function Admin() {
    const classes = useStyles()
    const [cases, setCases] = useState([])
    const [casesHeaders, setCasesHeaders] = useState([])

    return (
        <Page container={false}>
            <CasesProvider>
                <Container  maxWidth="xl">
                    <Grid container spacing={2} className={classes.mainGrid}>
                        <Grid item xs={12}>
                            <Typography variant="h1" align='center'>Administrar prototipo</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h2" className={classes.mb} >Carga masiva de casos</Typography>
                            <Typography variant="body1" className={classes.mb} >Arrastra un documento en formato csv. El documento (normalmente exportado desde una hoja de cálculo) debe contener una primera fila con las siguientes etiquetas de columna: companyName, caseType, description, region, profession, gender, ageRange, experience, terms, email. El resto de filas serán los datos correspondientes a cada una de las entradas a reportar.</Typography>
                            <DropZone setDataEntries={setCases} setDataHeaders={setCasesHeaders} className={classes.mb} />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h2" className={classes.mb} ><Warning /> Reiniciar prototipo</Typography>
                            <Typography variant="body1" className={classes.mb} > Se eliminarán todos los casos del contrato, se reiniciarán estadísticas y se limpiará la base de datos de usuarios de contacto.</Typography>
                            <Controls.Button 
                                type="submit"
                                text="REINICIAR"
                                // onClick={restartPrototype}
                                className={clsx(classes.mb,classes.formButton)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {cases === [] ? null : ( <DenseTable headers={casesHeaders} dataset={cases} /> )}
                        </Grid>
                    </Grid>
                </Container>
            </CasesProvider>
        </Page>
    )
}
