import { React, useState } from 'react'
// import { useMutation } from '@apollo/client'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import { v4 as uuid } from 'uuid'
import { useForm, Form } from '../../components/shared/useForm'
import Controls from '../../components/shared/controls/Controls'
import InfoDialog from '../../components/shared/InfoDialog'
import * as issueBadgeOptions from '../../services/issueBadgeOptions'

// import { ISSUE_BADGE } from '../../services/dbadge_backend/queries'
import { ethers } from 'ethers'
import { useMetamask } from 'use-metamask'
import Badge from '../../services/dbadge_backend/Badge.json'

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
    id: uuid(),
    issuerName: '',
    recipientName: '',
    area: '',
    issueDate: new Date(),
}

const recipient = '0x05eC46AeBA9Ed0bfC7318bA950977a22386A3fc2'

export default function IssueBadgeForm() {
    const classes = useStyles()

    const { metaState } = useMetamask()

    const { values, handleInputChange, submit } = useForm(initialFValues)
    // const [issueBadge, { data, loading, error }] = useMutation(ISSUE_BADGE)

    const issueBadgeBlockchain = async () => {
        // This code should be a component or hook
        const signer = metaState.web3.getSigner()
        // console.log('Signer: ')
        // console.log(signer)
        const badgeIssuerInstance = new ethers.Contract(
            Badge.address,
            Badge.abi,
            signer
        )
        // console.log('Connected to contract')
        try {
            const receipt = await badgeIssuerInstance.issue(
                values.issuerName,
                recipient,
                values.recipientName
            )
            // console.log('Transaciton sent')
            // console.log(receipt)
            // issueBadge({ variables: { data: values } })
            // console.log('DB recorded')
        } catch (e) {
            console.log('The error is:')
            console.error(e)
        }
    }

    // if (loading) return <Typography>Cargando...</Typography>
    // if (error)
    //     return (
    //         <InfoDialog
    //             title="Error"
    //             contentText={error.message}
    //             closeButtonText="Cerrar"
    //         />
    //     )

    return (
        <div className={classes.root}>
            <Form
                onSubmit={submit(issueBadgeBlockchain)}
                // onSubmit={submit(issueBadge, { variables: { data: values } })}
            >
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography>
                            1.- Datos que se almacenarán en la Blockchain de
                            forma pública
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
                            label="Área"
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
                            disabled={!metaState.isConnected}
                        />
                    </Grid>
                </Grid>
            </Form>
        </div>
    )
}
