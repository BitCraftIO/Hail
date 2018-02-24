import bip44hdkey from 'ethereumjs-wallet/hdkey';
import ethwallet from 'ethereumjs-wallet';
import ethtx from 'ethereumjs-tx';
import bip39 from 'bip39';

export function send() {}

export function createPrivateKeyPair(network) {
    switch (network) {
        case 'BTC':
            break;
        case 'LTC':
            break;
        case 'ETH':
            //TODO: Move this into Ethereum.js
            const mnemonic = bip39.generateMnemonic();
            console.log(bip39.mnemonicToSeed(mnemonic));
            const newAccount = bip44hdkey.fromMasterSeed(
                bip39.mnemonicToSeed(mnemonic)
            );
            const keynode = newAccount.derivePath("m/44'/60'/0'/0");
            const address = keynode.deriveChild(0);
            console.log(address);

            //Note: this is all incorrect if you see this comment
            return {
                masterKey: bip39.mnemonicToSeedHex(mnemonic),
                mnemonic: mnemonic,
                address: "m/44'/60'/0'/0 " + address.publicExtendedKey()
            };
            break;
        default:
            break;
    }
}

export function createPrivateKey() {}

export function createAddress() {}
