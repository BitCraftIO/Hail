import * as Ethereum from '../crypto/Ethereum.js';
import web3 from '../network/coins/Ethereum/Web3';
import { Alert } from 'react-native';
import * as coins from 'hail/app/crypto/coins'

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
    return 
    const rawTx = Ethereum.createRawTransaction(params);
    Alert.alert('Ready to Send?', 'This will send a transaction across testnet. Are you ready?', [
        {
            //TODO: Replace console.log with proper logger
            text: 'Send',
            onPress: () => {
                web3.eth.sendSignedTransaction(`0x${rawTx.toString('hex')}`, (error, result) => {
                    if (error) {
                        console.log(`Error: ${error}`);
                    } else {
                        console.log(`Result: ${result}`);
                        return result;
                    }
                });
            }
        }
    ]);
    }
}

export function estimateFee(coin, from, to, value) {
    switch (coin) {
        case 'ETH':
            return web3.eth.estimateGas({ from, to });
            break;
        default:
    }
}

export function getGasPrice() {
    return web3.eth.getGasPrice();
}

export function createPrivateKeyPair(coin, network = 'main') {
    switch (coin) {
        case 'ETH':
            return Ethereum.generateHDWallet();
            break;
        default:
            break;
    }
}

export function createPrivateKey() {}

export function createAddress() {}
