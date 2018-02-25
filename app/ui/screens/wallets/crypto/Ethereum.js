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
        console.log(mnemonic);
        const root = bip44hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
        const derivedNode = root.derivePath("m/44'/60'/0'/0");

        console.log(
            'BIP32 Extended Private Key: ' + derivedNode.privateExtendedKey()
        );

        const address = this.generateAddress(derivedNode);
        console.log(
            'Private Key: ' + bip39.mnemonicToSeed(mnemonic).toString('hex')
        );

        //Note: this is all incorrect if you see this comment
        //Unsure if this returns private key
        return {
            masterKey: bip39.mnemonicToSeed(mnemonic).toString('hex'),
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
