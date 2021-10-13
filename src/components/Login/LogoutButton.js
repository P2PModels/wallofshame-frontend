import { React, useEffect } from 'react'
import { useHistory } from 'react-router'
import { useMutation } from '@apollo/client'

import Controls from '../shared/controls/Controls'

import useAuth from '../../providers/Auth/use'

import { LOGOUT } from '../../services/dbadge_backend/queries'

export default function LogoutButton(props) {
    const { text = 'Logout', ...other } = props

    // Handle mutation errors
    const onError = e => {
        console.error(e)
        return
    }
    const [logoutMutation, logoutMutationState] = useMutation(LOGOUT, {
        onError: onError,
    })
    const { token, setAuth } = useAuth()
    const history = useHistory()

    useEffect(() => {
        if (!!logoutMutationState.data) {
            if (!logoutMutationState.data.connected) {
                setAuth({})
                history.replace('/logout')
            }
        }
    }, [logoutMutationState.data])

    return (
        <Controls.Button
            text={text}
            onClick={() =>
                logoutMutation({
                    headers: {
                        Authorization: token,
                    },
                })
            }
            {...other}
        ></Controls.Button>
    )
}
