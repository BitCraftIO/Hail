import bip44hdkey from 'ethereumjs-wallet/hdkey';
import ethwallet from 'ethereumjs-wallet';
import ethtx from 'ethereumjs-tx';
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

    static generateAddress(node, index = 0) {
        return bip44hdkey
            .fromExtendedKey(node.publicExtendedKey())
            .deriveChild(index)
            .getWallet()
            .getChecksumAddressString();
    }

    generateWalletFromKey() {}

    /**
     *
     * @param {*} privateKey
     * @param {*} fromAddress
     * @param {*} toAddress
     * @param {*} gasLimit
     * @param {*} gasPrice
     */
    createRawTransaction(options) {}

    _buildTransaction() {}

    _signTransaction() {}
}
