// TODO: Work in porgress...

import Badge from '../abis/Badge.json'

const Contracts = {
    Badge: Badge,
}

/**
 * Checks for the availability of the contract and returns its data in an object,
 * i.e. ABI and address.
 *
 * Examples:
 *   getContractData('Badge')    // Returns the data of contract Badge.
 *
 * @param {string} name The local name used in the Contracts object of this file.
 * As a convention the name of the contract, first letter capitalized.
 * @returns {Object} Contract data object {abi:{},address:{}}
 */

export const getContractData = name => {
    if (Contracts[name]) {
        return Contracts[name]
    } else {
        return null
    }
}
