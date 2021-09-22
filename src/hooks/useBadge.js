// TODO: Work in porgress...

import { useContractFunction } from '@usedapp/core'

/**
 * Returns an ethers.Contract instance of the selected contract with the current
 * signer. If the contract data is not available it throws an error.
 *
 * Examples:
 *   useContract('Badge')    // Returns an ethers.Contract instance of Badge.sol, found in the abis directory as Badge.json
 *
 * @param {string} name The local name used in the Contracts object from ../types/contracts.js
 * @returns {Contract} Ethers Contract instance
 */

export default function useBadge(method = null, overrides = null) {
    const { library: provider } = useEthers()
    const signer = provider.getSigner()
    const badgeContract = new ethers.Contract(Badge.address, Badge.abi, signer)
    const { state, send } = useContractFunction(
        badgeContract,
        method,
        overrides
    )

    return {
        state,
        send,
    }
}
