import { useState, useEffect } from 'react'
import { injected } from '../wallet-providers'
import { useEthers } from '@usedapp/core'

function useEagerConnect() {
    const { active, activate } = useEthers()

    const [tried, setTried] = useState(false)

    useEffect(() => {
        if (!active) {
            console.log('[useEagerConnect] Trying to connect')

            injected.isAuthorized().then(isAuthorized => {
                // console.log(isAuthorized)
                if (isAuthorized) {
                    activate(injected, undefined, true).catch(() => {
                        setTried(true)
                    })
                } else {
                    setTried(true)
                }
            })
        }
    }, []) // Only runs on mount

    // if the connection worked, wait until we get confirmation of that to flip the flag
    useEffect(() => {
        if (!tried && active) {
            setTried(true)
        }
    }, [tried, active])

    return [tried]
}

export default useEagerConnect
