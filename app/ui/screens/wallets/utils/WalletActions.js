import * as dbActions from 'hail/app/localstorage/db/utils/Actions';
import { Alert } from 'react-native';
import * as coins from 'hail/app/crypto/coins';
import logger from 'hail/app/utils/Logger.js';

/**
 *
 * @param {*} coin
 * @param {*} network
 * //Ethereum
 * @param {string} params.nonce must have 0x preceeding
 * @param {string} params.privateKey
 * @param {string} params.to destination address
 * @param {string} params.gasLimit must have 0x preceeding
 * @param {string} params.gasPrice must have 0x preceeding
 * @param {string} params.value must have 0x preceeding
 * @param {int} params.chainId EIP 155 chainId - mainnet: 1, ropsten: 3
 */
export function send(coin, params, network = 'main') {
    return coins[coin].send(params, network);
}

/**
 *
 * @param {string} coin BTC or ETH etc..
 * @param {string} network
 * @param {string} name
 * @param {string} walletType HD only for now
 */
export function create(coin, network, name, walletType) {
    dbActions.createWallet({
        ...createPrivateKeyPair(coin, walletType, network),
        coin,
        network,
        name,
        walletType
    });
    logger.info(`${coin} ${network} wallet created`);
}

/**
 *
 * @param {*} coin
 * @param {*} from
 * @param {*} to
 * @param {*} value
 */
export function estimateFee(coin, from, to, value) {
    return coins[coin].estimateFee(from, to, value);
}

/**
 *
 * @param {string} coin
 * @param {string} walletType
 * @param {string} network
 */
function createPrivateKeyPair(coin, walletType, network) {
    switch (walletType) {
        case 'HD':
            return coins[coin].generateHDWallet(network);
            break;
        case 'BIP32':
            return coins[coin].generateWallet();
            break;
        default:
            logger.error('createPrivateKeyPair switch failed because incorrect walletType');
    }
}

/**
 *
 * @param {string} coin BTC or ETH etc..
 * @param {*} wallet
 * @param {string} addressType P2PKH or P2WPKH
 * @param {bool} external false if internal
 */
export function generateNewAddress(coin, wallet, addressType, external) {
    const addressPayload = coins[coin].generateAddress(wallet, addressType, external);
    return dbActions.append(external ? wallet.externalAddresses : wallet.internalAddresses, addressPayload);
}
