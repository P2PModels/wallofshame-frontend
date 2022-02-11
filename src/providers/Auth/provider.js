import React, { useState } from 'react'
import { authContext } from './context'

const TOKEN_PREFIX = 'Commons '

function useAuthProvider() {
    function saveUser(user = undefined) {
        user
            ? sessionStorage.setItem('user', JSON.stringify(user))
            : sessionStorage.removeItem('user')
        setUser(getUser())
    }

    function getUser() {
        const userString = sessionStorage.getItem('user')
        const user = JSON.parse(userString)
        return user ? user : null
    }

    function saveToken(token = undefined) {
        token
            ? sessionStorage.setItem('token', TOKEN_PREFIX + token)
            : sessionStorage.removeItem('token')
        setToken(getToken())
    }

    function getToken() {
        const token = sessionStorage.getItem('token')
        return token ? token : null
    }

    const [user, setUser] = useState(getUser())
    const [token, setToken] = useState(getToken())

    const setAuth = a => {
        saveUser(a.user)
        saveToken(a.token)
    }

    return {
        user,
        token,
        setAuth,
    }
}

export default function AuthProvider({ children }) {
    const auth = useAuthProvider()
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}
