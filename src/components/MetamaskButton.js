import { React, useState } from 'react'
import { ethers } from 'ethers'
import { useMetamask } from 'use-metamask'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Controls from './shared/controls/Controls'
import ActionDialog from './shared/ActionDialog'

const useStyles = makeStyles(theme => ({
    metamaskButton: {},
    metamaskEnabled: {
        backgroundColor: '#f6851b',
    },
    metamaskDisabled: {
        backgroundColor: '#cdcdcd',
        '&:hover': {
            backgroundColor: '#ababab',
        },
    },
    metamaskConnected: {
        backgroundColor: '#86ee6f !important',
    },
}))

const MetamaskButton = props => {
    const classes = useStyles()
    const { ...other } = props

    const [enMetamaskDialog, setEnMetamaskDialog] = useState(false)
    const { connect, metaState } = useMetamask()

    const connectWeb3 = () => {
        if (!metaState.isConnected) {
            ;(async () => {
                try {
                    await connect(ethers.providers.Web3Provider, { chainId: 4 })
                } catch (error) {
                    console.log(error)
                }
            })()
        }
    }

    return (
        <>
            {enMetamaskDialog ? (
                <ActionDialog
                    title="🦊 Instala Metamask  🦊"
                    contentText="No se ha detectado Metamask. Para poder realizar acciones utilizando Ethereum debes instalar el plugin de Metamask. Una vez hayas finalizado la instalación refresca la página o pulsa en Hecho"
                    primaryActionButton="Ir a metamask.io"
                    primaryActionHandler={() =>
                        window.open('https://metamask.io', '_blank')
                    }
                    secondaryActionButton="Hecho"
                    secondaryActionHandler={() => window.location.reload()}
                    closeHandler={() => setEnMetamaskDialog(false)}
                />
            ) : (
                ''
            )}

            {metaState.isAvailable ? (
                metaState.isConnected ? (
                    <Controls.Button
                        text={'METAMASK CONECTADO 🦊'}
                        className={clsx(
                            classes.metamaskButton,
                            classes.metamaskConnected
                        )}
                        {...other}
                        disabled
                    />
                ) : (
                    <Controls.Button
                        text={'CONECTAR METAMASK 🦊'}
                        className={clsx(
                            classes.metamaskButton,
                            classes.metamaskEnabled
                        )}
                        onClick={connectWeb3}
                        {...other}
                    />
                )
            ) : (
                <Controls.Button
                    text={'HABILITAR METAMASK 🦊'}
                    className={clsx(
                        classes.metamaskButton,
                        classes.metamaskDisabled
                    )}
                    onClick={() => setEnMetamaskDialog(true)}
                    {...other}
                />
            )}
        </>
    )
}

export default MetamaskButton
