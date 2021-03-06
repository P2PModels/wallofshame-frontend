import { React } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import Controls from './Shared/controls/Controls'
import {
    categories,
    regionToRegionRenderName,
    professionToProfessionRenderName,
    genderToGenderRenderName,
    ageRangeToAgeRangeRenderName,
    experienceToExperienceRenderName,
} from '../data/config.json'
import { createOptionsObjectFromArrays } from '../helpers/general-helpers'

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
                    options={createOptionsObjectFromArrays(
                            categories.regions,
                            regionToRegionRenderName
                        ).sort((a, b) => a.label.localeCompare(b.label))
                    }
                    value={values.region}
                    onChange={handleInputChange}
                    className={clsx(classes.field, classes.smallField)}
                    labelTitle
                    required
                />
                <div className={classes.spacer} />
                <Controls.Select
                    name="profession"
                    label="Profesi??n"
                    options={createOptionsObjectFromArrays(
                        categories.professions,
                        professionToProfessionRenderName
                    )}
                    value={values.profession}
                    onChange={handleInputChange}
                    className={clsx(classes.field, classes.smallField)}
                    labelTitle
                    required
                />
                <div className={classes.spacer} />
                <Controls.RadioGroup
                    name="gender"
                    label="G??nero"
                    items={createOptionsObjectFromArrays(
                        categories.genders,
                        genderToGenderRenderName
                    )}
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
                    options={createOptionsObjectFromArrays(
                        categories.ageRanges,
                        ageRangeToAgeRangeRenderName
                    )}
                    value={values.ageRange}
                    onChange={handleInputChange}
                    className={clsx(classes.field, classes.smallField)}
                    labelTitle
                    required
                />
                <Controls.Select
                    name="experience"
                    label="Experiencia"
                    options={createOptionsObjectFromArrays(
                        categories.experiences,
                        experienceToExperienceRenderName
                    )}
                    value={values.experience}
                    onChange={handleInputChange}
                    className={clsx(classes.field, classes.smallField)}
                    labelTitle
                    required
                />
            </Grid>
            <Grid item xs={8} className={classes.row}>
                <Controls.Checkbox
                    name="terms"
                    checked={values.authContact}
                    msg="Autorizo a que la plataforma me ponga en contacto con personas en mi misma situaci??n"
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
