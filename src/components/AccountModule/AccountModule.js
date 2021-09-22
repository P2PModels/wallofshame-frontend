import React, { useState, useEffect } from 'react'
import { useEthers } from '@usedapp/core'
import { makeStyles } from '@material-ui/core/styles'

import { getNetwork } from '../../networks'
import { transformError } from '../../wallet-providers'

import Controls from '../shared/controls/Controls'
import ProvidersModal from '../Modals/ProvidersModal.js'
import IdentityBadge from './IdentityBadge'
import MessageModal from '../Modals/MessageModal'

import useEagerConnect from '../../hooks/useEagerConnect'
import useInactiveListener from '../../hooks/useInactiveListener'

const useStyles = makeStyles(theme => ({
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
    },
    disconnectButton: {
        marginLeft: theme.spacing(1),
    },
}))

const AccountModule = () => {
    const { wrapper, disconnectButton } = useStyles()

    const {
        activate,
        deactivate,
        active,
        account,
        chainId,
        connector,
    } = useEthers()

    const [activatingConnector, setActivatingConnector] = useState()
    const [openModal, setOpenModal] = useState(false)
    const [error, setError] = useState(undefined)

    const networkName = !isNaN(chainId) ? getNetwork(chainId).name : ''

    // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
    const [triedEager] = useEagerConnect()

    // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
    useInactiveListener(!triedEager || !!activatingConnector)

    const handleSelectProvider = currentConnector => {
        if (!activatingConnector) {
            setActivatingConnector(currentConnector)

            activate(currentConnector).then(
                () => {
                    setOpenModal(false)
                },
                err => {
                    console.log(err)
                    setError(transformError(err))
                    setActivatingConnector(undefined)
                    setOpenModal(false)
                }
            )
        }
    }

    useEffect(() => {
        // console.log('[useEffect]')
        // console.log(connector)
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined)
        }
    }, [activatingConnector, connector])

    return (
        <div className={wrapper}>
            {account ? (
                <>
                    <IdentityBadge address={account} network={networkName} />
                    <Controls.Button
                        variant="contained"
                        color="secondary"
                        className={disconnectButton}
                        onClick={() => deactivate()}
                        text="Desconectar"
                    />
                </>
            ) : (
                <Controls.Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpenModal(true)}
                    text="Conectar cuenta"
                />
            )}

            <ProvidersModal
                open={openModal}
                activating={!!activatingConnector}
                onSelect={handleSelectProvider}
                onClose={() => setOpenModal(false)}
            />
            <MessageModal
                open={!!error}
                type={error ? error.type : ''}
                title={error ? error.title : ''}
                message={error ? error.msg : ''}
                onClose={() => setError(undefined)}
            />
        </div>
    )
}

export default AccountModule
