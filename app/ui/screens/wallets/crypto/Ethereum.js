import bip44hdkey from 'ethereumjs-wallet/hdkey';
import Wallet from 'ethereumjs-wallet';
import EthereumTx from 'ethereumjs-tx';
import bip39 from 'bip39';
//import web3 from '../network/coins/Ethereum/Web3';

/**
 * @param masterKey
 * @param address
 */
export function generateHDWallet() {
    const mnemonic = bip39.generateMnemonic();
    console.log(`Mnemonic: ${mnemonic}`);
    const root = bip44hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
    const derivedNode = root.derivePath("m/44'/60'/0'/0");
    const address = this.generateAddressFromNode(derivedNode);
    console.log(`Private Key: ${root._hdkey.privateKey.toString('hex')}`);

    /*
        for now we must save the extended private key and generate the private key from that
        as hdkey has no good way of beginning from a private key. Rather than amend the problem in the repo,
        I'll spend my time doing something better. Like making sure transactions work

        //root._hdkey.privateKey.toString('hex')
    */
    return {
        masterKey: root._hdkey.privateKey.toString('hex'),
        address: "m/44'/60'/0'/0/0 " + address
    };
}

export function extendedPrivateKeyToNode() {}

/**
 *
 * @param {string} privateKey
 */
export function privateKeyToNode(privateKey) {
    const node = new bip44hdkey();
    node.privateKey = privateKey;
    return node;
}

export function privateKeyToAddrNode(privateKey) {
    return privateKeyToNode(privateKey).deriveChild("m/44'/60'/0'/0");
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
