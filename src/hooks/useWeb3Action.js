// TODO: Work in porgress...

import { useEffect } from 'react'
import { useDAppManager } from '../helpers/dAppManager'
import { ActionTypes } from '../types/web3-action-types'
import { useContractFunction } from '@usedapp/core'

export const useWeb3Action = a => {
    const { initialized, getContractInstance } = useDAppManager()

    useEffect(() => {
        if (!!initialized) {
            console.log('dApp Manager initialized')
            if (a.type === ActionTypes['contractCall']) {
                const contractInstance = getContractInstance(
                    a.info.contractName
                )
                const { state, send } = useContractFunction(
                    contractInstance,
                    a.info.functionName,
                    { transactionName: a.info.txName }
                )
                console.log(state)
                console.log(send)
                return [send, state]
            } else {
                // TODO: Return action no defined error
                console.error('Action not defined')
                return [false, false]
            }
        } else {
            console.log('dApp Manager not initialized')
            // TODO: Return action no defined error
            console.warn('Web3 not connected')
            return [false, false]
        }
    }, [initialized]) // If the Manager is initialized, the hook refreshs the instances

    // TODO: Return action no defined error
    console.warn('Web3 not connected')
    return [false, false]
}
