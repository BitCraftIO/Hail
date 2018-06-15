import { TransactionBuilder } from 'bitcoinjs-lib/';
const bip39 = require('bip39');
import createHash from 'create-hash';
import bs58check from 'bs58check';
import * as hdutil from './util/hd';

export function send(params, network) {}

/**
 *
 * @param {string} network MAIN or TEST
 * @param {string} addressType P2PKH or P2WPKH
 */
export function generateHDWallet(network, addressType = 'P2PKH') {
    var wallet = hdutil.generateHDWallet(network == 'MAIN' ? 0 : 1); //wallet not to be confused with Realm Wallet Object
    wallet.network = network;
    return {
        privateKey: wallet.root.privateKey.toString('hex'),
        mnemonic: wallet.mnemonic,
        externalAddresses: generateAddress(wallet, addressType, true),
        internalAddresses: generateAddress(wallet, addressType, false)
    };
}

/**
 *
 * @param {*} wallet
 * @param {string} addressType P2PKH or P2WPKH
 * @param {boolean} external false if internal
 * @param {int} index
 */
export function generateAddress(wallet, addressType = 'P2PKH', external = true, index = 0) {
    var changeNode = external ? wallet.externalNode : wallet.internalNode;
    if (!changeNode && external) changeNode = hdutil.mnemonicToExternalNode(wallet.mnemonic, wallet.network == 'MAIN' ? 0 : 1);
    //If no, then we are in wallet creation
    if (wallet.externalAddresses) index = external ? wallet.externalAddresses.length : wallet.internalAddresses.length;

    const addrNode = changeNode.deriveChild(index);

    switch (addressType) {
        case 'P2PKH':
            return [
                {
                    string: createBitcoinAddress(addrNode.publicKey, wallet.network),
                    signingKey: addrNode.privateKey,
                    derivationPath: `m/44'/${wallet.network == 'MAIN' ? 0 : 1}'/0'/0/${index}`,
                    type: addressType
                }
            ];
            break;
        case 'P2WPKH':
            return createSegwitAddress();
        default:
    }
}

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

export function generateKeyStore() {}

export function estimateFee() {}

function createP2WPKHAddress() {}
