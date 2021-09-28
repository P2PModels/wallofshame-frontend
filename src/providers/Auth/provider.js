import React, { useState } from 'react'
import { authContext } from './context'

const TOKEN_PREFIX = 'Commons '

function useProvideAuth() {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)

    const setAuth = a => {
        setUser(a.user)
        const tokenWithPrefix = TOKEN_PREFIX + a.token
        setToken(tokenWithPrefix)
    }

    return {
        user,
        token,
        setAuth,
    }
}

export default function ProvideAuth({ children }) {
    const auth = useProvideAuth()
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}
