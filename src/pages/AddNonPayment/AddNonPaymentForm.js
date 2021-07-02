import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import { useForm, Form } from '../../components/shared/useForm'
import Controls from '../../components/shared/controls/Controls'
import * as nonPaymentService from '../../services/nonPaymentService'

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
        value: 'otro',
        label: 'Otro',
    },
]

const useStyles = makeStyles(theme => ({
    root: {
        '& hr': {
            color: 'transparent',
            borderTop: `1px dashed ${theme.palette.text.light}`,
        },
        '& .MuiFormControl-root': {
            width: '48%',
        },
    },
    spacer: {
        width: '52%',
    },
    w100: {
        width: '100% !important',
    },
    ml4: {
        marginLeft: '4% !important',
    },
}))

const initialFValues = {
    id: 0,
    docNumber: '',
    issueDate: null,
    expirationDate: null,
    sector: '',
    amount: '',
    dni: '',
    gender: 'femenino',
    ageRange: '',
    province: '',
    delegation: '',
    category: '',
    profession: '',
}

export default function AddNonPaymentForm() {
    const classes = useStyles()

    const { values, handleInputChange } = useForm(initialFValues)

    return (
        <div className={classes.root}>
            <Form>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography>1.- Datos factura</Typography>
                        <Controls.Input
                            name="docNumber"
                            label="Número DOC"
                            value={values.docNumber}
                            onChange={handleInputChange}
                        />
                        <div className={classes.spacer} />
                        <Controls.DatePicker
                            name="issueDate"
                            label="Fecha de emisión (DD/MM/AAAA)"
                            value={values.issueDate}
                            onChange={handleInputChange}
                        />
                        <Controls.DatePicker
                            className={classes.ml4}
                            name="expirationDate"
                            label="Fecha de vencimiento (DD/MM/AAAA)"
                            value={values.expirationDate}
                            onChange={handleInputChange}
                        />
                        <Controls.Select
                            name="sector"
                            label="Sector"
                            value={values.sector}
                            onChange={handleInputChange}
                            options={nonPaymentService.getSectorOptions()}
                        />
                        <div className={classes.spacer} />
                        <Controls.Input
                            name="amount"
                            label="Importe"
                            value={values.amount}
                            onChange={handleInputChange}
                        />
                    </Grid>
                </Grid>
                <hr />
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography my={1}>2.- Datos personales</Typography>
                        <Controls.Input
                            name="dni"
                            label="DNI"
                            value={values.dni}
                            onChange={handleInputChange}
                        />
                        <div className={classes.spacer} />
                        <Controls.RadioGroup
                            className={classes.w100}
                            name="gender"
                            label="Género"
                            value={values.gender}
                            onChange={handleInputChange}
                            items={genderItems}
                        />
                        <Controls.Select
                            name="ageRange"
                            label="Rango de edad"
                            value={values.ageRange}
                            onChange={handleInputChange}
                            options={nonPaymentService.getAgeRangeOptions()}
                        />
                        <div className={classes.spacer} />
                        <Controls.Select
                            name="province"
                            label="Provincia"
                            value={values.province}
                            onChange={handleInputChange}
                            options={nonPaymentService.getProvinceOptions()}
                        />
                        <Controls.Select
                            className={classes.ml4}
                            name="delegation"
                            label="Delegación"
                            value={values.delegation}
                            onChange={handleInputChange}
                            options={nonPaymentService.getDelegationOptions()}
                        />
                        <Controls.Select
                            name="category"
                            label="Categoría"
                            value={values.category}
                            onChange={handleInputChange}
                            options={nonPaymentService.getCategoryOptions()}
                        />
                        <Controls.Input
                            className={classes.ml4}
                            name="profession"
                            label="Profesión"
                            value={values.profession}
                            onChange={handleInputChange}
                        />
                    </Grid>
                </Grid>
                <hr />
                <Grid container spacing={1} justify="flex-end">
                    <Grid item>
                        <Controls.Button type="submit" text="GUARDAR FACTURA" />
                    </Grid>
                </Grid>
                {/* 
                <Grid item xs={6} spacing={3}>
                    <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/mm/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Fecha de vencimiento (DD/MM/AAAA)"
                    value={expirationDate}
                    onChange={handleDateChange(setExpirationDate)}
                    KeyboardButtonProps={{
                    'aria-label': 'Cambiar fecha de vencimiento',
                    }}
                    />
                </Grid>
                </Grid>
*/}
            </Form>
        </div>
    )
}
