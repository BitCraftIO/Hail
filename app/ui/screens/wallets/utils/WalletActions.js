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

export function create(coin, network, name, walletType) {
    return dbActions.createWallet({
        ...createPrivateKeyPair(coin, walletType, network),
        coin,
        network,
        name,
        walletType
    });
}

export function estimateFee(coin, from, to, value) {
    return coins[coin].estimateFee(from, to, value);
}

export function createPrivateKeyPair(coin, walletType, network) {
    switch (walletType) {
        case 'HD':
            return coins[coin].generateHDWallet(network);
            break;
        case 'PAIR':
            return coins[coin].generateWallet();
            break;
        default:
            logger.error('createPrivateKeyPair switch failed because incorrect walletType');
    }
}

export function createPrivateKey() {}

export function createAddress(wallet) {
    return coins[coin].generateAddressForIndex(wallet, wallet.addresses.length);
}
