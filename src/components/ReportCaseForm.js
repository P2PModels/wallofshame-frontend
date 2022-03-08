import { React, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Grid, Typography } from '@material-ui/core'
import { useMutation } from '@apollo/client'
import { Redirect } from 'react-router-dom'
import { useForm, Form } from './Shared/useForm'
import Controls from './Shared/controls/Controls'
import InfoDialog from './Shared/InfoDialog'

import { REPORT } from '../services/cases_backend/queries'
import { ADD_USER } from '../services/users/queries'
import HorizontalStepper from './Shared/HorizontalStepper'
import ReportCaseFormPart1 from './ReportCaseFormPart1'
import ReportCaseFormPart2 from './ReportCaseFormPart2'
import { Check } from '@material-ui/icons'

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
    const [sendReport, { data: response, loading, error }] = useMutation(REPORT)
    const [addUser, { data: addedUser, loading: loadingUser, error: errorUser }] = useMutation(ADD_USER)
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
            // console.warn('Submiting after validation', values)
            let user = {
                email: values.email,
                terms: values.terms,
                region: values.region,
                profession: values.profession,
                gender: values.gender,
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
            addUser({ variables: { data: user } })
            sendReport({ variables: { data: reportCase } })
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

    if (loading){
        return loadingUser ? (
            <Typography>Reportando tu caso y guardando datos de contacto...</Typography>
        ) : (
            <>
                <Check /> <Typography>Contacto guardado: {addedUser.add.email}</Typography>
                <Typography>Reportando tu caso...</Typography> 
            </>
        )
    }

    if (errorUser) 
        return (
            <InfoDialog
                title="Error"
                contentText={errorUser.message}
                closeButtonText="Cerrar"
            />
        )
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
