import { React, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Grid, Typography } from '@material-ui/core'
import { useMutation } from '@apollo/client'
import { v4 as uuid } from 'uuid'
import { Redirect } from 'react-router-dom'
import { useForm, Form } from './Shared/useForm'
import Controls from './Shared/controls/Controls'
import InfoDialog from './Shared/InfoDialog'
import CircularProgress from '@mui/material/CircularProgress';
import { REPORT } from '../services/report/queries'
import HorizontalStepper from './Shared/HorizontalStepper'
import ReportCaseFormPart1 from './ReportCaseFormPart1'
import ReportCaseFormPart2 from './ReportCaseFormPart2'

const useStyles = makeStyles(theme => ({
    stepper: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
    },
    formButton: {
        boxShadow: 'none',
        borderRadius: 0,
        color: theme.palette.text.light,
    },
    buttonRow: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '4rem',
    },
    loadingSpinner: {
        color: theme.palette.primary.light,
        margin: '3rem 0 3rem',
        //padding: '4rem 0 2rem', // por lo que se mueve
    },
    loadingText1: {
        color: theme.palette.primary.light,
        fontSize: '2rem',
        fontWeight: '400',
        padding: '2rem 0 2rem',
        position: "relative",
        margin: '2rem 0 2rem',
    },
    loadingText2: {
        color: theme.palette.primary.light,
        fontSize: '1rem',
        fontWeight: '400',
        padding: '2rem 0 2rem',
        position: "relative",
        margin: '2rem 0 2rem',
    },
    loadingContainer: {
        height: '40%',
        textAlign: 'center',
        //padding: '1rem',
        position: 'relative',
    },
}))

const initialFValues = {
    // id: uuid(),
    companyName: '',
    caseType: '',
    description: '',
    region: '',
    profession: '',
    gender: '',
    ageRange: '',
    experience: '',
    // authContact: false,
    // email: '',
}

export default function ReportCaseForm() {
    const classes = useStyles()

    const [activeStep, setActiveStep] = useState(0)
    const { values, handleInputChange, submit } = useForm(initialFValues)
    let [sendReport, { data: response, loading, error }] = useMutation(REPORT)
    loading = true
    const [showInfoDialog, setShowInfoDialog] = useState(false)
    const [infoDialogMsg, setInfoDialogMsg] = useState('')

    // const submitCheat = () => console.log('The dark side wants to submit...')
    const validatePart1 = e => {
        e.preventDefault()
        if (values.companyName == '') {
            setShowInfoDialog(true)
            setInfoDialogMsg('Debes introducir un nombre de empresa.')
        } else if (values.caseType == '') {
            setShowInfoDialog(true)
            setInfoDialogMsg('Debes introducir un tipo de caso.')
        } else if (values.description == '') {
            setShowInfoDialog(true)
            setInfoDialogMsg('Debes introducir una descripción de tu caso.')
        } else if (values.description.length < 150) {
            setShowInfoDialog(true)
            setInfoDialogMsg(
                'Debes ampliar la descripción, el mínimo número de caracteres es 150.'
            )
        } else {
            setActiveStep(1)
        }
    }

    const validatePart2 = e => {
        e.preventDefault()
        if (values.region == '') {
            setShowInfoDialog(true)
            setInfoDialogMsg('Debes seleccionar tu provicia.')
        } else if (values.profession == '') {
            setShowInfoDialog(true)
            setInfoDialogMsg('Debes seleccionar tu profesión.')
        } else if (values.gender == '') {
            setShowInfoDialog(true)
            setInfoDialogMsg('Debes marcar tu género.')
        } else if (values.ageRange == '') {
            setShowInfoDialog(true)
            setInfoDialogMsg('Debes seleccionar tu rango de edad.')
        } else if (values.experience == '') {
            setShowInfoDialog(true)
            setInfoDialogMsg('Debes seleccionar tu nivel de experiencia.')
        } else if (values.authContact && values.email == '') {
            setShowInfoDialog(true)
            setInfoDialogMsg(
                'Has autorizado que contactemos contigo pero no has especificado una dirección de correo.'
            )
            // } else if (
            //     values.authContact &&
            //     !values.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
            // ) {
            //     setShowInfoDialog(true)
            //     setInfoDialogMsg('E-mail inválido.')
        } else {
            // submitCheat()
            console.warn('Submiting after validation', values)
            sendReport({ variables: { data: values } })
            setActiveStep(0)
        }
    }

    const renderActiveStep = step => {
        switch (step) {
            case 0:
                return (
                    <>
                        <ReportCaseFormPart1
                            values={values}
                            handleInputChange={handleInputChange}
                        />
                        <Grid container spacing={1} justify="flex-end">
                            <Grid item className={classes.buttonRow}>
                                <Controls.Button
                                    type="button"
                                    text="SIGUIENTE"
                                    onClick={validatePart1}
                                    className={classes.formButton}
                                />
                                <InfoDialog
                                    open={showInfoDialog}
                                    title="Error en el formulario"
                                    contentText={infoDialogMsg}
                                    closeButtonText="Cerrar"
                                    onClose={() => {
                                        // Add js focus on field
                                        setShowInfoDialog(false)
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </>
                )

            case 1:
                return (
                    <>
                        <ReportCaseFormPart2
                            values={values}
                            handleInputChange={handleInputChange}
                        />
                        <Grid container spacing={1}>
                            <Grid item xs={8} className={classes.buttonRow}>
                                <Controls.Button
                                    type="submit"
                                    text="FINALIZAR"
                                    onClick={validatePart2}
                                    className={classes.formButton}
                                    // disabled={!active}
                                />
                                <InfoDialog
                                    open={showInfoDialog}
                                    title="Error en el formulario"
                                    contentText={infoDialogMsg}
                                    closeButtonText="Cerrar"
                                    onClose={() => {
                                        // Add js focus on field
                                        setShowInfoDialog(false)
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </>
                )
        }
    }

    if (loading) return (
          //<Box position="relative" display="inline-flex">
           <>

            <Box  className = {classes.loadingContainer}
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="relative"
                alignItems="center"
                justifyContent="center"
            >
                <Grid container spacing={0}  className = {classes.loadingContainer}>
                    <Grid item  >
                        <Typography textAlign='center' className={classes.loadingText1}>
                            Estamos registrando tu denuncia.                                    
                        </Typography>
                        
                    </Grid>
                </Grid>

                <Grid container spacing={0}  className = {classes.loadingContainer}>
                    <Grid item item xs={6}>
                    <Typography textAlign='center' className={classes.loadingText2}>
                            Este proceso puede tardar unos segundos...                                    
                        </Typography>                    </Grid>
                    <Grid item item xs={2}>
                        <CircularProgress size={44} color="inherit"  className = {classes.loadingSpinner}/>  
                    </Grid>
                </Grid>
                
            </Box>

            
            </>
      );
    //return <Typography>Reportando tu caso...</Typography>
    if (error)
        return (
            <InfoDialog
                title="Error"
                contentText={error.message}
                closeButtonText="Cerrar"
            />
        )

    return response ? (
        <Redirect
            to={{
                pathname: '/confirmation',
                state: { report: response.report },
            }}
        />
    ) : (
        <Box className={classes.root}>
            <HorizontalStepper
                activeStep={activeStep}
                className={classes.stepper}
            />
            <Form
                onSubmit={submit(sendReport, { variables: { data: values } })}
                // onSubmit={submitCheat}
                id="report-case-form"
            >
                {renderActiveStep(activeStep)}
            </Form>
        </Box>
    )
}
