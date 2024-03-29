import React, {useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Grid, Typography } from '@material-ui/core'
import { useMutation } from '@apollo/client'
import { Redirect } from 'react-router-dom'
import { useForm, Form } from './Shared/useForm'
import Controls from './Shared/controls/Controls'
import InfoDialog from './Shared/InfoDialog'
import ActionDialog from './Shared/ActionDialog'
import CircularProgress from '@mui/material/CircularProgress';
import { REPORT } from '../services/cases_backend/queries'
import { ADD_USER } from '../services/users/queries'
import HorizontalStepper from './Shared/HorizontalStepper'
import ReportCaseFormPart1 from './ReportCaseFormPart1'
import ReportCaseFormPart2 from './ReportCaseFormPart2'

const useStyles = makeStyles(theme => ({
    title: {
        color: theme.palette.primary.main,
        fontSize: '4rem',
        fontWeight: '700',
        padding: '4rem 0 2rem',
    },
    caption: {
        fontSize: '1.25rem',
    },
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

const initialFValues = {
    companyName: '',
    caseType: '',
    description: '',
    region: '',
    profession: '',
    gender: '',
    ageRange: '',
    experience: '',
    terms: false,
    email: '',
}

export default function ReportCaseForm() {
    const classes = useStyles()
    
    const [activeStep, setActiveStep] = useState(0)
    const { values, handleInputChange, submit } = useForm(initialFValues)
    const [sendReport, { data: reportedCase, loading: loadingCase, error: errorCase }] = useMutation(REPORT)
    const [addUser, { data: addedUser, loading: loadingUser, error: errorUser }] = useMutation(ADD_USER)
    const [showInfoDialog, setShowInfoDialog] = useState(false)
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)
    const [infoDialogMsg, setInfoDialogMsg] = useState('')
    const [infoDialogTitle, setInfoDialogTitle] = useState('')

    const validatePart1 = event => {
        event.preventDefault()
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

    const validatePart2 = event => {

        event.preventDefault()
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
        } else if (values.terms && values.email == '') {
            setShowInfoDialog(true)
            setInfoDialogMsg(
                'Has autorizado que contactemos contigo pero no has especificado una dirección de correo.'
            )
        } else if (
            values.terms &&
            !values.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        ) {
            setShowInfoDialog(true)
            setInfoDialogMsg('E-mail inválido.')
        } else {
            setShowConfirmationDialog(true)
        }
    }

    const reportAction = () => {
        // console.warn('Submiting after validation', values)
        let user = {}
        if(values.email !== ''){
            user = {
                email: values.email,
                terms: values.terms,
                region: values.region,
                profession: values.profession,
                gender: values.gender,
            }
        }

        let reportCase = {
            companyName: values.companyName,
            caseType: values.caseType,
            description: values.description,
            region: values.region,
            profession: values.profession,
            gender: values.gender,
            ageRange: values.ageRange,
            experience: values.experience,
        }
        
        try {
            if(values.email !== ''){
                // console.log("[ReportCaseForm] User: ")
                // console.log(user)
                addUser({ variables: { data: user } })
            }
            // console.log("[ReportCaseForm] Case: ")
            // console.log(reportCase)
            sendReport({ variables: { data: reportCase } })
        }
        catch(error){ 
            console.log(error)
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
                                { !errorCase && !errorUser  ? (     
                                        <Controls.Button
                                            type="submit"
                                            text="FINALIZAR"
                                            onClick={validatePart2}
                                            className={classes.formButton}
                                            // disabled={!active}
                                        />
                                    ) : (
                                        <Controls.Button
                                            type="submit"
                                            text="REINTENTAR"
                                            onClick={validatePart2}
                                            className={classes.formButton}
                                        />
                                )}
                                <InfoDialog
                                    open={showInfoDialog}
                                    title={infoDialogTitle}
                                    contentText={infoDialogMsg}
                                    closeButtonText="Cerrar"
                                    onClose={() => {
                                        // Add js focus on field
                                        setShowInfoDialog(false)
                                    }}
                                />
                                <ActionDialog 
                                    open={showConfirmationDialog}
                                    title="¿Confirmas que quieres enviar tu caso?"
                                    contentText={'Tus datos serán almacenados de forma permanente sin posibilidad de ser editados.'}
                                    primaryActionButton="Confirmar"
                                    primaryActionHandler={() => {
                                        setShowConfirmationDialog(false)
                                        reportAction()
                                    }}
                                    secondaryActionButton="Cerrar"
                                    secondaryActionHandler={() => setShowConfirmationDialog(false)}
                                    closeButtonText="Confirmar"
                                    onClose={() => setShowConfirmationDialog(false)}
                                />  
                            </Grid>
                        </Grid>
                    </>
                )
        }
    }

    useEffect(() => {
        if (errorUser) {
            // console.log(errorUser)
            setShowInfoDialog(true)
            setInfoDialogTitle('Error al guardar tu contacto')
            setInfoDialogMsg(errorUser.message)
        }

        if (errorCase) {
            // console.log(errorCase)
            setShowInfoDialog(true)
            setInfoDialogTitle('Error registrar tu caso')
            setInfoDialogMsg(errorCase.message)
        }

    }, [reportedCase, addedUser, errorUser, errorCase, loadingCase])

    //  else {

    if (loadingCase || loadingUser) {
        // console.log("Loading...")
        return (
            <Grid item  lg={12} className = {classes.flexColumn}>
                <CircularProgress size={44} color="inherit"  className = {classes.loadingSpinner}/>  
                <Typography className={classes.loadingText1}>
                    Estamos registrando tu denuncia.                                    
                </Typography>
                <Typography className={classes.loadingText2}>
                    Este proceso puede tardar unos segundos...                                    
                </Typography>     
            </Grid>    
        )
    }
    if(reportedCase && addedUser || reportedCase && values.email == ''){
        // console.log("[ReportForm] Success!")
        return(
            <Redirect
                to={{
                    pathname: '/confirmation',
                    state: { report: [reportedCase.report,  addedUser ? addedUser.email : ''] },
                }}
            />
        )
    }

    return(
        <Grid item lg={6}>
            <Typography variant="h2" className={classes.title}>
                Informa sobre tu caso
            </Typography>
            <Typography variant="body1" className={classes.caption}>
                La información es poder. Si has sufrido algún tipo
                de abuso por parte de pagadores privados,
                administración o algún otro tipo de entidad pública
                o privada, déjanos un testimonio anónimo para ayudar
                a otros/as compañeros/as de profesión.
            </Typography>
                    
            <Box className={classes.root}>
                <HorizontalStepper
                    activeStep={activeStep}
                    className={classes.stepper}
                    />
                <Form
                    // onSubmit={submit(sendReport, { variables: { data: values } })}
                    id="report-case-form"
                    >
                    {renderActiveStep(activeStep)}
                </Form>
            </Box>
        </Grid>
    )
    // }    

}
