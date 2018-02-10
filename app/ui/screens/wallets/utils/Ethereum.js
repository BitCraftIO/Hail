import ethWallet, { 
    fromPrivateKey,
} from 'ethereumjs-wallet';
import {
    pubToAddress,
} from 'ethereumjs-util';

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
}