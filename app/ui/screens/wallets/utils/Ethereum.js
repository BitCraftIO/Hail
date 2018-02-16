import ethWallet, { 
    fromPrivateKey,
} from 'ethereumjs-wallet';
import {
    pubToAddress,
} from 'ethereumjs-util';
import web3 from '../network/coins/Ethereum/Web3';


// TODO: move this to /app/screen/wallets/crypto
export default class Ethereum {

    /**
     * returns priv key and initial address
     */
    generateNewWallet() {
        const account = ethWallet.generate();
        const privateKey = newAccount.getPrivateKeyString();
        const publicKey = newAccount.getAddressString();

        return (privateKey, publicKey);
    }

    generateWalletFromKey() {

    }

    generateAddress(privateKey) {
        return pubToAddress(privateKey, true).toString();
    }
    
    /**
     * 
     * @param {*} privateKey 
     * @param {*} fromAddress 
     * @param {*} toAddress 
     * @param {*} gasLimit 
     * @param {*} gasPrice 
     */
    createRawTransaction(options) {

    }

    _buildTransaction() {

    }

    _signTransaction() {

    }


}