const bitcoinjs = require('bitcoinjs-lib')

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
        this.network = _getNetworkFromKey(network)
    }

    /**
     * Randomly generate a new elliptic-curve keypair.
     */
    getRandomKeyPair() {
        return bitcoinjs.ECPair.makeRandom({
            network: this.network
        })
    }

    /**
     * 
     * @param {*} keyPair 
     */
    getPublicAddressFromKeyPair(keyPair) {
        return keyPair.getAddress()
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