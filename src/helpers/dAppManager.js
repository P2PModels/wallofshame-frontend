// TODO: Work in porgress...

import { useState, useEffect, createContext } from 'react'
import { useEthers } from '@usedapp/core'
import { ethers } from 'ethers'

import { getContractData } from '../types/contracts'

const initialDAppState = {
    signer: {},
    contractsInstances: {},
    activated: false,
    initialized: false,
}

const dAppStateContext = createContext(initialDAppState)

/**
 * dApp Manager hook, manages signer account and contracts intances.
 *
 * Examples:
 *   conts {init, web3Provider, signer, getContractInstance } = useDAppManager()
 *
 * @returns {Fnc} init() initialices DAppState
 * @returns {Provider}
 * @returns {Signer} Ethers Signer
 * @returns {Fnc} getContractInstance returns an Ethers Contract object
 */

export const useDAppManager = () => {
    const [dAppState, setDAppState] = useState(initialDAppState)
    const {
        account,
        chainId,
        connector,
        library: web3Provider,
        active,
        activate,
        deactivate,
    } = useEthers()

    useEffect(() => {
        console.log('[useDAppState effect] Launching init...')
        if (dAppState.activated) {
            init()
        }
        return () => {
            disconnect()
        }
    }, [dAppState.activated])

    /**
     * Connects to a web3Provider or wallet.
     *
     * Examples:
     *   const activationPromise = connect(connector)
     *
     * @param {Connector} currentConnector from web3-react Connector
     * @returns {Promise}
     */

    const connect = (currentConnector = false) => {
        if (!!currentConnector) {
            /* Third function argument allows us to emit a promise
            so we can catch it and close modal in case everything
            went right */
            const activationPromise = activate(currentConnector, null, true)
            const activated = true
            setDAppState({
                dAppState,
                ...activated,
            })
            return activationPromise
        } else {
            // TODO: return error connector not provided
            console.log('Error: connector not provided')
            return false
        }
    }

    /**
     * Initialice dAppState, get signer, object of contracts instances.
     *
     * Examples:
     *   connect(connector).then(
     *      () => { init() },
     *      (err) => { console.log(err) }
     *   )
     */

    const init = () => {
        const initDAppState = {}
        // console.log(active)
        // if(!!active){
        initDAppState.signer = web3Provider.getSigner()
        initDAppState.contractsInstances = {}
        initDAppState.initialized = true

        setDAppState(initDAppState)
        console.info('dApp State initialiced')
        console.log(initDAppState)
        console.log(dAppState)

        // } else {
        //     console.log('Error active flag set to false')
        // }
    }

    /**
     * Disconnect dAppState, clean state variable and disconnect from wallet/provider.
     *
     * Examples:
     *   disconnect()
     *
     */

    const disconnect = () => {
        if (dAppState.activated) {
            setDAppState(initialDAppState)
            deactivate()
        }
    }

    /**
     * Checks for the availability of the contract instance and returns it. In case the
     * contract is not already instantiated, creates a new instance. The data necessary to
     * instantiate the contract has to be stored locally.
     *
     * Examples:
     *   getContractInstance('Badge')    // Returns the instance of the Badge contract
     *
     * @param {string} name The name of the contract, first letter Capitalized
     * @returns {Contract} Ethers Contract instance
     */

    const getContractInstance = name => {
        if (!!dAppState.initialized) {
            if (!!dAppState.contractsInstances[name]) {
                return dAppState.contractsInstances[name]
            } else {
                // Get ABI and address from local files
                const contractData = getContractData(name)
                // const _contractInstances= dAppState.contractsInstances
                // console.log(_contractInstances)
                // Create instance
                try {
                    const newInstance = new ethers.Contract(
                        contractData.address,
                        contractData.abi,
                        dAppState.signer
                    )
                    const contractsInstances = {
                        // _contractsInstances,
                        ...dAppState.contractsInstances,
                        name: newInstance,
                    }
                } catch (e) {
                    console.error(e)
                }
                // Save instance
                setDAppState({
                    dAppState,
                    ...contractsInstances,
                })
                return state.contractsInstances[name]
            }
        }
    }

    return {
        connect,
        init,
        disconnect,
        web3Provider,
        signer: dAppState.signer,
        account,
        chainId,
        connector,
        active,
        initialized: dAppState.initialized,
        getContractInstance,
    }
}
