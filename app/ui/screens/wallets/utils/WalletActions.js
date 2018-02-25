import Ethereum from '../crypto/Ethereum.js';

export function send() {}

export function createPrivateKeyPair(network) {
    switch (network) {
        case 'BTC':
            break;
        case 'LTC':
            break;
        case 'ETH':
            console.log(Ethereum);
            return Ethereum.generateHDWallet();
            break;
        default:
            break;
    }
}

export function createPrivateKey() {}

export function createAddress() {}
