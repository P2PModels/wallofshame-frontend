import React from 'react'
import clsx from 'clsx'
import { Box, Stepper, Step, StepLabel, makeStyles } from '@material-ui/core'

const steps = ['Datos sobre la empresa', 'Sobre ti']

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: 'transparent',
    },
}))

export default function HorizontalStepper({ activeStep, className, ...other }) {
    const classes = useStyles()

    return (
        <Stepper
            activeStep={activeStep}
            className={clsx(classes.container, className)}
            {...other}
        >
            {steps.map(label => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
    )
}
