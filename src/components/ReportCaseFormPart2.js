import { React } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import Controls from './Shared/controls/Controls'

const regionOptions = [
    {
        value: 'madrid',
        label: 'Madrid',
    },
    {
        value: 'barcelona',
        label: 'Barcelona',
    },
    {
        value: 'sevilla',
        label: 'Sevilla',
    },
]

const professionOptions = [
    {
        value: 'arquitectx',
        label: 'Arquitectx',
    },
    {
        value: 'artistx',
        label: 'Artistx',
    },
    {
        value: 'diseñadorx',
        label: 'Diseñadorx',
    },
]

const genderItems = [
    {
        value: 'femenino',
        label: 'Femenino',
    },
    {
        value: 'masculino',
        label: 'Masculino',
    },
    {
        value: 'nobinario',
        label: 'No binario',
    },
    {
        value: 'otro',
        label: 'Otro',
    },
]

const ageRangeOptions = [
    {
        value: '18-25',
        label: '18-25',
    },
    {
        value: '25-35',
        label: '25-35',
    },
    {
        value: '35-45',
        label: '35-45',
    },
]

const experienceOptions = [
    {
        value: 'ninguna',
        label: 'Ninguna',
    },
    {
        value: '1-3años',
        label: '1-3 años',
    },
    {
        value: '3-5años',
        label: '3-5 años',
    },
]

const useStyles = makeStyles(theme => ({
    row: {
        paddingTop: '0 !important',
        paddingBottom: '0 !important',
    },
    title: {
        color: theme.palette.primary.main,
        fontSize: '2.25rem',
        fontWeight: '700',
        marginBottom: theme.spacing(1),
    },
    smallField: {
        width: '35%',
        display: 'inline-block',
        marginRight: '30%',
        '&:last-child': {
            marginRight: 0,
        },
    },
    field: {
        marginTop: '2rem',
    },
    w100: {
        width: '100%',
    },
    spacer: {
        width: '52%',
    },
}))

export default function ReportCaseFormPart2({ values, handleInputChange }) {
    const classes = useStyles()

    return (
        <Grid container spacing={1}>
            <Grid item xs={8} className={classes.row}>
                <Typography variant="h3" className={classes.title}>
                    Datos sobre ti
                </Typography>
                <Typography variant="h6">
                    Los campos con asterisco son obligatorios
                </Typography>
                <Controls.Select
                    name="region"
                    label="Provincia"
                    options={regionOptions}
                    value={values.region}
                    onChange={handleInputChange}
                    className={clsx(classes.field, classes.smallField)}
                    labelTitle
                    required
                />
                <div className={classes.spacer} />
                <Controls.Select
                    name="profession"
                    label="Profesión"
                    options={professionOptions}
                    value={values.profession}
                    onChange={handleInputChange}
                    className={clsx(classes.field, classes.smallField)}
                    labelTitle
                    required
                />
                <div className={classes.spacer} />
                <Controls.RadioGroup
                    name="gender"
                    label="Género"
                    items={genderItems}
                    value={values.gender}
                    onChange={handleInputChange}
                    className={clsx(classes.field, classes.w100)}
                    labelTitle
                    required
                />
            </Grid>
            <Grid item xs={8} className={classes.row}>
                <Controls.Select
                    name="ageRange"
                    label="Rango de edad"
                    options={ageRangeOptions}
                    value={values.ageRange}
                    onChange={handleInputChange}
                    className={clsx(classes.field, classes.smallField)}
                    labelTitle
                    required
                />
                <Controls.Select
                    name="experience"
                    label="Experiencia"
                    options={experienceOptions}
                    value={values.experience}
                    onChange={handleInputChange}
                    className={clsx(classes.field, classes.smallField)}
                    labelTitle
                    required
                />
            </Grid>
            <Grid item xs={8} className={classes.row}>
                <Controls.Checkbox
                    name="authContact"
                    checked={values.authContact}
                    msg="Autorizo a que la plataforma me ponga en contacto con personas en mi misma situación"
                    onChange={handleInputChange}
                    className={classes.field}
                    required
                />
                <Controls.Input
                    name="email"
                    label="Tu email"
                    placeholder="Tu email"
                    value={values.email}
                    onChange={handleInputChange}
                    className={classes.field}
                    labelTitle
                />
                <div className={classes.spacer} />
            </Grid>
        </Grid>
    )
}
