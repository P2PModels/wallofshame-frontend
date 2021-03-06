import { React } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import { n } from '@apollo/client'
import { v4 as uuid } from 'uuid'
import { useForm, Form } from './Shared/useForm'
import Controls from './Shared/controls/Controls'
import InfoDialog from './Shared/InfoDialog'
import * as issueBadgeOptions from '../helpers/issueBadgeOptions'

import { ISSUE_BADGE } from '../services/dbadge_backend/queries'
// import { ethers } from 'ethers'
// import { useEthers } from '@usedapp/core'

// import Badge from '../abis/Badge.json'

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
    // id: uuid(),
    issuerName: '',
    recipientName: '',
    area: '',
    issueDate: new Date(),
}

const recipient = '0x05eC46AeBA9Ed0bfC7318bA950977a22386A3fc2'

export default function IssueBadgeForm() {
    const classes = useStyles()

    // const { library: provider, active } = useEthers()

    const { values, handleInputChange, submit } = useForm(initialFValues)
    const [issueBadge, { data, loading, error }] = useMutation(ISSUE_BADGE)

    // const issueBadgeBlockchain = async () => {
    //     // This code should be a component or hook
    //     const signer = provider.getSigner()
    //     const badgeIssuerInstance = new ethers.Contract(
    //         Badge.address,
    //         Badge.abi,
    //         signer
    //     )
    //     try {
    //         const receipt = await badgeIssuerInstance.issue(
    //             values.issuerName,
    //             recipient,
    //             values.recipientName
    //         )
    //         console.log('Transaciton sent')
    //         console.log(receipt)
    //         // issueBadge({ variables: { data: values } })
    //         // console.log('DB recorded')
    //     } catch (e) {
    //         console.log('The error is:')
    //         console.error(e)
    //     }
    // }

    if (loading) return <Typography>Cargando...</Typography>
    if (error)
        return (
            <InfoDialog
                title="Error"
                contentText={error.message}
                closeButtonText="Cerrar"
            />
        )

    return (
        <div className={classes.root}>
            {/* <Form onSubmit={submit(issueBadgeBlockchain)}> */}
            <Form
                onSubmit={submit(issueBadge, { variables: { data: values } })}
            >
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography>
                            1.- Datos que se almacenar??n en la Blockchain de
                            forma p??blica
                        </Typography>
                        <Controls.Input
                            name="issuerName"
                            label="Persona/Entidad emisora"
                            value={values.issuerName}
                            onChange={handleInputChange}
                        />
                        <div className={classes.spacer} />
                        <Controls.Input
                            name="recipientName"
                            label="Persona/Entidad a certificar"
                            value={values.recipientName}
                            onChange={handleInputChange}
                        />
                    </Grid>
                </Grid>
                <hr />
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography my={1}>
                            2.- Datos registrados de forma privada por Smart
                        </Typography>
                        <Controls.Select
                            name="area"
                            label="??rea"
                            value={values.area}
                            onChange={handleInputChange}
                            options={issueBadgeOptions.getAreaOptions()}
                        />
                    </Grid>
                </Grid>
                <hr />
                <Grid container spacing={1} justify="flex-end">
                    <Grid item>
                        <Controls.Button
                            type="submit"
                            text="EMITIR SELLO"
                            // disabled={!active}
                        />
                    </Grid>
                </Grid>
            </Form>
        </div>
    )
}
