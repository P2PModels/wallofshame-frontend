import { React } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Paper, Typography } from '@material-ui/core'
import { v4 as uuid } from 'uuid'
import { useForm, Form } from '../shared/useForm'
import Controls from '../shared/controls/Controls'

// import { ISSUE_BADGE } from '../../services/dbadge_backend/queries'

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
    username: '',
    password: '',
}

export default function LoginForm() {
    const classes = useStyles()

    const { values, handleInputChange, submit } = useForm(initialFValues)
    // const [issueBadge, { data, loading, error }] = useMutation(ISSUE_BADGE)

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
            <Paper>
                <Form onSubmit={submit()}>
                    <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <Typography>Acceso</Typography>
                            <Controls.Input
                                name="username"
                                label="Usuario/a"
                                value={values.username}
                                onChange={handleInputChange}
                            />
                            <div className={classes.spacer} />
                            <Controls.Input
                                name="password"
                                label="Contraseña"
                                value={values.password}
                                onChange={handleInputChange}
                            />
                        </Grid>
                    </Grid>
                </Form>
            </Paper>
        </div>
    )
}
