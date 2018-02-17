import { ECPair, HDNode, TransactionBuilder } from 'bitcoinjs-lib'
const bip39 = require('bip39')

/**
 * Util class for dealing with calculations for any Bitcoin-based coin.
 * Does not keep track of wallets.
 */
export default class Bitcoin {
    /**
     * Create a new instance of the Bitcoin util class.
     * @param {*} network Network used for operations in this instance.
     */
    constructor(network) {
        this.network = Bitcoin._getNetworkFromKey(network)
    }

    /**
     * Generates a BIP39 mnemonic and a corresponding HD node.
     */
    getRandomMnemonic() {
        return bip39.generateMnemonic()
    }

    /**
     * Returns true if a valid mnemonic is supplied.
     */
    validateMnemonic(mnemonic) {
        properLength = mnemonic.trim().split(/\s+/g).length >= 12
        return bip39.validateMnemonic(mnemonic) && properLength
    }

    /**
     * Returns the HD node from a supplied BIP39 mnemonic.
     */
    getHDNodeFromMnemonic(mnemonic) {
        if (!this.validateMnemonic(mnemonic))
            throw new Error('Invalid mnemonic passed.')
        seed = bip39.mnemonicToSeed(mnemonic)
        return HDNode.fromSeedBuffer(seed, this.network)
    }

    deriveHDNodeFromParent(parentHDNode, index) {
        return parentHDNode.derive(index)
    }

    /**
     * Resolve the `network` parameter into a member of `bitcoin.networks`.
     * 
     * @param key Whatever key Harsha creates
     */
    static _getNetworkFromKey(key) {
        // TODO: actually implement this based off whatever harsha does
        return bitcoinjs.networks.bitcoin
    }
}