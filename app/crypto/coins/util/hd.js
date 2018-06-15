//Utils file for hd wallets
import bip39 from 'bip39';
import bip44hdkey from 'hdkey';

export function generateHDWallet(cointype) {
    const mnemonic = bip39.generateMnemonic();
    const root = bip44hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
    const externalNode = root.derive(`m/44'/${cointype}'/0'/0`);
    const internalNode = root.derive(`m/44'/${cointype}'/0'/1`);

    console.log(`Mnemonic: ${mnemonic}`);
    console.log(`Private Key: ${root.privateKey.toString('hex')}`);
    console.log(`Private Key Not hex: ${root.privateKey}`);

    return {
        mnemonic,
        root,
        externalNode,
        internalNode
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
 * @param {*} mnemonic string
 * @param {*} cointype int
 */
export function mnemonicToExternalNode(mnemonic, cointype) {
    return bip44hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic)).derive(`m/44'/${cointype}'/0'/0`);
}
