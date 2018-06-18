import web3 from '../network/coins/Ethereum/Web3';
import bip44hdkey from 'ethereumjs-wallet/hdkey';
import Wallet from 'ethereumjs-wallet';
import EthereumTx from 'ethereumjs-tx';
import bip39 from 'bip39';
import logger from '../../utils/Logger';
import * as hdutil from './util/hd';

//TODO: implement support for testnet
export function send(params, network) {
    const rawTx = createRawTransaction(params);
    return web3.eth.sendSignedTransaction(`0x${rawTx.toString('hex')}`, (error, result) => {
        error ? logger.error('sendSignTransaction Failed') : logger.info('sendSignTransaction Succeeded');
    });
}

export function generateHDWallet(network) {
    var wallet = hdutil.generateHDWallet(60);
    wallet.network = network;
    wallet.privateKey = wallet.root.privateKey.toString('hex');

    return {
        privateKey: wallet.privateKey,
        mnemonic: wallet.mnemonic,
        externalAddresses: generateAddress(wallet)
    };
}

export function generateAddress(wallet, index = 0) {
    const addrNode = bip44hdkey.fromExtendedKey(wallet.externalNode.publicExtendedKey).deriveChild(index);
    const address = addrNode.getWallet().getChecksumAddressString();

    return [
        {
            string: address,
            derivationPath: `m/44'/60'/0'/0/${index}`,
            signingKey: new Buffer(wallet.privateKey, 'hex'),
            type: 'STANDARD'
        }
    ];
}

/**
 *
 * @param {string} from hex
 * @param {string} to hex
 * @param {string} data hex
 */
export function estimateFee(from, to = '4584158529818ef77D1142bEeb0b6648BD8eDb2f', data) {
    return estimateGas(from, to, data).then(gas => {
        estimatePrice().then(price => {
            resolve(price, gas);
        });
    });
}

/**
 *
 * @param {string} privateKey
 * @param {string} password the password to encrypt the keystore to
 */
export function generateKeyStore(privateKey, password) {
    const wal = Wallet.fromPrivateKey(Buffer.from(privateKey, 'hex'));
    return wal.toV3String(password);
}

export function generateWalletFromKey() {
    //TODO:
}

/**
 * https://github.com/ethereumjs/ethereumjs-tx#usage
 * @param {string} nonce must have 0x preceeding
 * @param {string} privateKey
 * @param {string} to destination address
 * @param {string} gasLimit must have 0x preceeding
 * @param {string} gasPrice must have 0x preceeding
 * @param {string} value must have 0x preceeding
 * @param {int} chainId EIP 155 chainId - mainnet: 1, ropsten: 3
 */
export function createRawTransaction(options) {
    const tx = new EthereumTx(options);
    tx.sign(options.privateKey);
    return tx.serialize();
}

/**
 *
 * @param {string} from hex
 * @param {string} to hex
 * @param {string} data hex
 */
function estimateGas(from, to, data) {
    return web3.eth.estimateGas({ from, to, data });
}

function estimatePrice() {
    return web3.eth.getGasPrice();
}
