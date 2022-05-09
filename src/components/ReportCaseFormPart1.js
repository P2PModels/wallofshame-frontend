import { React } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import Controls from './Shared/controls/Controls'
import { categories, typeToTypeRenderName } from '../data/config.json'
import { createOptionsObjectFromArrays } from '../helpers/general-helpers'

const useStyles = makeStyles(theme => ({
    title: {
        color: theme.palette.primary.main,
        fontSize: '2.25rem',
        fontWeight: '700',
        marginBottom: theme.spacing(1),
    },
    requiredAdvice: {
        fontSize: '0.75rem',
        marginBottom: theme.spacing(1),
    },
    field: {
        marginTop: '2rem',
    },
    note: {
        marginLeft: '2rem',
        maxWidth: '500px',
    },
    description: {
        marginBottom: '3rem',
        position: 'relative',
        '&:after': {
            content: "'150 - 500'",
            color: theme.palette.text.secondary,
            display: 'block',
            position: 'absolute',
            bottom: '-1rem',
            right: 0,
        },
    },
    spacer: {
        width: '52%',
    },
}))

export default function ReportCaseFormPart1({ values, handleInputChange }) {
    const classes = useStyles()

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography variant="h3" className={classes.title}>
                    Datos sobre la empresa
                </Typography>
                <Typography variant="h6" className={classes.requiredAdvice}>
                    Los campos con asterisco son obligatorios
                </Typography>
                <Controls.Input
                    name="companyName"
                    label="Nombre de la empresa"
                    placeholder="Nombre de la empresa"
                    value={values.companyName}
                    onChange={handleInputChange}
                    className={classes.field}
                    required
                    labelTitle
                />
                <div className={classes.spacer} />
                <Controls.RadioGroup
                    name="caseType"
                    label="Tipo de caso"
                    items={createOptionsObjectFromArrays(categories.types, typeToTypeRenderName)}
                    value={values.caseType}
                    onChange={handleInputChange}
                    className={classes.field}
                    labelTitle
                    required
                />
                <Typography className={classes.note}>
                    Entendemos por maltrato cosas como: racaneos en los precios,
                    mensajes de whatsapp a todas horas, presión, malas maneras,
                    falsas promesas de visibilidad… y cualquier cosa que te
                    produzca ansiedad.
                </Typography>
                <Controls.Input
                    name="description"
                    label="Explícanos brevemente tu caso"
                    placeholder="Descibe aquí lo que te ha pasado. Mínimo 150 caracteres."
                    value={values.description}
                    onChange={handleInputChange}
                    className={clsx(classes.field, classes.description)}
                    required
                    multiline
                    rows="6"
                    inputProps={{ maxLength: 500 }}
                    fullWidth
                    labelTitle
                />
            </Grid>
        </Grid>
    )
}
