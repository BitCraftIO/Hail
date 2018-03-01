import bip44hdkey from 'ethereumjs-wallet/hdkey';
import wallet from 'ethereumjs-wallet';
import EthereumTx from 'ethereumjs-tx';
import bip39 from 'bip39';
//import web3 from '../network/coins/Ethereum/Web3';

export default class Ethereum {
    /**
     * @param masterKey
     * @param address
     */
    static generateHDWallet() {
        const mnemonic = bip39.generateMnemonic();
        console.log(`Mnemonic: ${mnemonic}`);
        const root = bip44hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
        const derivedNode = root.derivePath("m/44'/60'/0'/0");
        const address = this.generateAddress(derivedNode);
        console.log(`Private Key: ${root._hdkey.privateKey.toString('hex')}`);

        //TODO: Verify that this private key relates to the address
        //Note: this is all incorrect if you see this comment
        return {
            masterKey: root._hdkey.privateKey.toString('hex'),
            address: "m/44'/60'/0'/0 " + address
        };
    }

    /**
     * Ensure that the node passed through has a path similar to m/purpose/cointype/0'/0
     * @param {hdkey} node
     * @param {int} index
     */
    static generateAddress(node, index = 0) {
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
    generateKeyStore(privateKey, password) {
        const wal = wallet.fromPrivateKey(Buffer.from(privateKey, 'hex'));
        return wal.toV3String(password);
    }

    generateWalletFromKey() {}

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
    createRawTransaction(options) {
        const tx = new EthereumTx(options);
        tx.sign(options.privateKey);
        return tx.serialize();
    }
}
