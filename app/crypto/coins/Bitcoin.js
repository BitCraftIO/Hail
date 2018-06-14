import { TransactionBuilder } from 'bitcoinjs-lib/';
const bip39 = require('bip39');
import createHash from 'create-hash';
import bs58check from 'bs58check';
import * as hdutil from './util/hd';
//TODO: logger

export function send(params, network) {}

/**
 * @param masterKey
 * @param address
 */
export function generateHDWallet(network, addrType = 'P2PKH') {
    const wallet = hdutil.generateHDWallet(network == 'MAIN' ? 0 : 1); //wallet not to be confused with Realm Wallet Object

    return {
        privateKey: wallet.root.privateKey.toString('hex'),
        mnemonic: wallet.mnemonic,
        addresses: [
            {
                ...this.generateAddressFromExternalNode(wallet, addrType),
                derivationPath: `m/44'/${network == 'MAIN' ? 0 : 1}'/0'/0/0`,
                type: 'P2PKH'
            }
        ]
    };
}

/**
 *
 * @param {string} from hex
 * @param {string} to hex
 * @param {string} data hex
 */
export function estimateFee(from, to = '4584158529818ef77D1142bEeb0b6648BD8eDb2f', data) {}

export function generateNewAddress(wallet, addrType = 'P2PKH') {
    wallet.externalNode = hdutil.mnemonicToExternalNode(wallet.mnemonic, wallet.network == 'MAIN' ? 0 : 1);
    return [
        {
            ...this.generateAddressFromExternalNode(wallet, addrType, wallet.addresses.length),
            derivationPath: `m/44'/${wallet.network == 'MAIN' ? 0 : 1}'/0'/0/${wallet.addresses.length}`,
            type: addrType
        }
    ];
}

//TODO: Documentation
/**
 * Ensure that the node passed through has a path similar to m/purpose/cointype/0'/0
 * Make sure user knows that address = account so this should only be used to create a new wallet
 * with the same priv key as another
 * @param {hdkey} node
 * @param {int} index
 * @param {string} type Standard or Segwit
 * @param {wallet} wallet used purely to determine network
 */
export function generateAddressFromExternalNode(wallet, type, index = 0) {
    const { externalNode, network } = wallet;
    const addrNode = externalNode.deriveChild(index);
    switch (type) {
        case 'P2PKH':
            return {
                string: createBitcoinAddress(addrNode.publicKey, network),
                signingKey: addrNode.privateKey
            };
            break;
        case 'P2WPKH':
            return createSegwitAddress();
        default:
    }
}

function createP2WPKHAddress() {}

function createBitcoinAddress(publicKey, network) {
    const step1 = publicKey;
    const step2 = createHash('sha256')
        .update(step1)
        .digest();
    const step3 = createHash('rmd160')
        .update(step2)
        .digest();
    var step4 = Buffer.allocUnsafe(21);
    step4.writeUInt8(network == 'MAIN' ? 0x00 : 0x6f, 0);
    step3.copy(step4, 1); //step3 now holds the extended RIPMD-160 result
    const step9 = bs58check.encode(step4);
    console.log('Base58Check: ' + step9);
    return step9;
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
 *
 * @param {string} txType
 * @param {string} privateKey
 * @param {Array} to Array of objects with two keys: address, value
 * @param {Array} from Array of objects with two keys: txhash, index, signingKey
 * @param {string} gasPrice must have 0x preceeding
 * @param {int} network
 */
export function createRawTransaction(options) {
    const txbuilder = TransactionBuilder();
    switch (txType) {
        case 'P2PKH': //normal tx
            txbuilder.setVersion(1);
            options.from.forEach(utxo => {
                txbuilder.addInput(utxo.txhash, utxo.index);
            });
            options.to.forEach(destination => {
                txbuilder.addOutput(destination.address, destination.value); //for sending multiple outputs bc I'm cool but don't support this yet.
            });
            for (var i = 0; i < from.length; i++) {
                txbuilder.sign(from[i].signingKey, i);
            }
        case 'P2SH': //multi sig
        case 'P2WSH': //segwit
        default:
    }

    return txbuilder.build().toHex();
}
