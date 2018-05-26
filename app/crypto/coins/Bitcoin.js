import TransactionBuilder from 'bitcoinjs-lib/transaction_builder';
const bip39 = require('bip39');
import createHash from 'create-hash';
import bs58check from 'bs58check';
import * as hdutil from './util/hd';

export function send(params, network) {}

/**
 * @param masterKey
 * @param address
 */
export function generateHDWallet() {
    const wallet = hdutil.generateHDWallet(0);
    const address = this.generateAddressFromNode(wallet.addressNode);

    /*
        for now we must save the extended private key and generate the private key from that
        as hdkey has no good way of beginning from a private key. 
    */
    return {
        privateKey: wallet.root._hdkey.privateKey.toString('hex'),
        extendedPrivateKey: wallet.root.privateExtendedKey(),
        addresses: [{ string: address, derivationPath: "m/44'/0'/0'/0/0 " }]
    };
}

/**
 *
 * @param {string} from hex
 * @param {string} to hex
 * @param {string} data hex
 */
export function estimateFee(from, to = '4584158529818ef77D1142bEeb0b6648BD8eDb2f', data) {}

/**
 *
 * @param {string} privateKey
 */
export function generateAddressForIndex(wallet, index) {
    const node = hdutil.privateKeyToAddrNode(wallet.privateKey);
    return this.generateAddressFromNode(node, index, wallet);
}

/**
 * Ensure that the node passed through has a path similar to m/purpose/cointype/0'/0
 * Make sure user knows that address = account so this should only be used to create a new wallet
 * with the same priv key as another
 * @param {hdkey} node
 * @param {int} index
 */
export function generateAddressFromNode(node, index = 0, wallet) {
    const addrNode = node.derive(index);
    return createBitcoinAddressI(addrNode._publicKey);
}

function createBitcoinAddress(privateKey) {
    const step1 = privateKey;
    const step2 = createHash('sha256')
        .update(step0)
        .digest();
    const step3 = createHash('rmd160')
        .update(step1)
        .digest();
    var step4 = Buffer.allocUnsafe(21);
    step4.writeUInt8(wallet.network == 'MAIN' ? 0x00 : 0x6f, 0);
    step3.copy(step4, 1); //step3 now holds the extended RIPMD-160 result
    var step9 = bs58check.encode(step4);
}

/**
 *
 * @param {string} privateKey
 * @param {string} password the password to encrypt the keystore to
 */
export function generateKeyStore(privateKey, password) {}

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
export function createRawTransaction(options) {}
