import { React, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router'
import { useMutation } from '@apollo/client'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Paper, Typography, CircularProgress } from '@material-ui/core'

import Controls from '../shared/controls/Controls'

import { useForm, Form } from '../shared/useForm'
import useAuth from '../../providers/Auth/use'

import { LOGIN } from '../../services/dbadge_backend/queries'

const useStyles = makeStyles(theme => ({
    root: {
        '& hr': {
            color: 'transparent',
            borderTop: `1px dashed ${theme.palette.error.dark}`,
        },
    },
    form: {
        padding: `${theme.spacing(4)}px`,
    },
    inputForm: {
        width: '100%',
        margin: `${theme.spacing(1)}px 0`,
    },
    submitButton: {
        margin: `${theme.spacing(1)}px 0`,
    },
    errorMsg: {
        textAlign: 'center',
        color: theme.palette.error.main,
    },
}))

const initialFValues = {
    email: '',
    password: '',
}

export default function LoginForm() {
    const classes = useStyles()

    const { values, handleInputChange, submit } = useForm(initialFValues)
    // Handle mutation errors
    const onError = e => {
        console.error(e)
        return
    }
    const [loginMutation, loginMutationState] = useMutation(LOGIN, {
        onError: onError,
    })
    const { setAuth } = useAuth()
    const history = useHistory()
    const location = useLocation()

    // Redirect to Issue Badge by default, or to last visited page if exists
    const { from } = location.state || { from: { pathname: '/issue-badge' } }

    useEffect(() => {
        if (!!loginMutationState.data) {
            setAuth(loginMutationState.data.login)
            history.replace(from)
        }
    }, [loginMutationState.data])

    return (
        <div className={classes.root}>
            <Paper>
                <Form
                    className={classes.form}
                    onSubmit={submit(loginMutation, {
                        variables: {
                            email: values.email,
                            password: values.password,
                        },
                    })}
                >
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography variant="h4">Acceso</Typography>
                            <hr />
                            {!!loginMutationState.loading ? (
                                <Grid container justify="center">
                                    <CircularProgress />
                                    <Typography>Cargando...</Typography>
                                </Grid>
                            ) : (
                                <>
                                    <Controls.Input
                                        name="email"
                                        label="Correo electrónico"
                                        value={values.email}
                                        onChange={handleInputChange}
                                        className={classes.inputForm}
                                    />
                                    <div className={classes.spacer} />
                                    <Controls.Input
                                        name="password"
                                        label="Contraseña"
                                        type="password"
                                        value={values.password}
                                        onChange={handleInputChange}
                                        className={classes.inputForm}
                                    />
                                </>
                            )}
                        </Grid>
                    </Grid>
                    <hr />
                    <Grid container spacing={1} justify="flex-end">
                        <Grid item>
                            <Controls.Button
                                type="submit"
                                text="Entrar"
                                className={classes.submitButton}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {!!loginMutationState.error ? (
                                <Typography
                                    variant="body1"
                                    className={classes.errorMsg}
                                >
                                    Error: {loginMutationState.error.message}
                                </Typography>
                            ) : null}
                        </Grid>
                    </Grid>
                </Form>
            </Paper>
        </div>
    )
}
