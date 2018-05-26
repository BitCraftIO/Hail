//Utils file for hd wallets
import bip39 from 'bip39';

export function generateHDWallet(cointype) {
    const mnemonic = bip39.generateMnemonic();
    console.log(`Mnemonic: ${mnemonic}`);
    const root = bip44hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
    console.log(`Private Key: ${root._hdkey.privateKey.toString('hex')}`);
    const addressNode = root.derivePath(`m/44'/${cointype}'/0'/0`);

    return {
        mnemonic,
        root,
        addressNode
    };
}

export function extendedPrivateKeyToNode() {}

/**
 *
 * @param {string} privateKey
 */
function privateKeyToNode(privateKey) {
    const node = new bip44hdkey();
    node.privateKey = privateKey;
    return node;
}

/**
 *
 * @param {string} privateKey
 */
export function privateKeyToAddrNode(privateKey, cointype) {
    return privateKeyToNode(privateKey).deriveChild(`m/44'/${cointype}'/0'/0`);
}
