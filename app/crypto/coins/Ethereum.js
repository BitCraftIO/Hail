import web3 from '../network/coins/Ethereum/Web3';
import bip44hdkey from 'ethereumjs-wallet/hdkey';
import Wallet from 'ethereumjs-wallet';
import EthereumTx from 'ethereumjs-tx';
import bip39 from 'bip39';
import Logger from '../../utils/Logger';
import * as hdutil from './util/hd';
const filename = 'Ethereum.js';
const logger = new Logger(filename);

//TODO: implement support for testnet
export function send(params, network) {
    const rawTx = createRawTransaction(params);
    return web3.eth.sendSignedTransaction(`0x${rawTx.toString('hex')}`, (error, result) => {
        error ? logger.error('sendSignTransaction Failed') : logger.info('sendSignTransaction Succeeded');
    });
}

/**
 * @param masterKey
 * @param address
 */
export function generateHDWallet() {
    const wallet = hdutil.generateHDWallet(60);
    const address = this.generateAddressFromNode(wallet.addressNode);

    /*
        for now we must save the extended private key and generate the private key from that
        as hdkey has no good way of beginning from a private key. 
    */
    return {
        privateKey: wallet.root._hdkey.privateKey.toString('hex'),
        extendedPrivateKey: wallet.root.privateExtendedKey(),
        addresses: [{ string: address, derivationPath: "m/44'/60'/0'/0/0 " }]
    };
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

export function generateAddressForIndex(wallet, index) {
    const node = hdutil.privateKeyToAddrNode(wallet.privateKey);
    return this.generateAddressFromNode(node, index);
}

/**
 * Ensure that the node passed through has a path similar to m/purpose/cointype/0'/0
 * Make sure user knows that address = account so this should only be used to create a new wallet
 * with the same priv key as another
 * @param {hdkey} node
 * @param {int} index
 */
export function generateAddressFromNode(node, index = 0) {
    return bip44hdkey
        .fromExtendedKey(node.publicExtendedKey())
        .deriveChild(index)
        .getWallet()
        .getChecksumAddressString();
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
