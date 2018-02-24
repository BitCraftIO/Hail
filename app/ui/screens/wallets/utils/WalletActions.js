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
            console.log(mnemonic);
            const root = bip44hdkey.fromMasterSeed(
                bip39.mnemonicToSeed(mnemonic)
            );
            const derivedNode = root.derivePath("m/44'/60'/0'/0");

            console.log(
                'BIP32 Extended Private Key: ' +
                    derivedNode.privateExtendedKey()
            );
            console.log(
                bip44hdkey
                    .fromExtendedKey(derivedNode.publicExtendedKey())
                    .deriveChild(0)
                    .getWallet()
                    .getChecksumAddressString()
                //.toString('hex')
            );
            const address = bip44hdkey
                .fromExtendedKey(derivedNode.publicExtendedKey())
                .deriveChild(0)
                .getWallet()
                .getChecksumAddressString();

            //Note: this is all incorrect if you see this comment
            return {
                masterKey: bip39.mnemonicToSeedHex(mnemonic),
                mnemonic: mnemonic,
                address: "m/44'/60'/0'/0 " + address //.publicExtendedKey()
            };
            break;
        default:
            break;
    }
}

export function createPrivateKey() {}

export function createAddress() {}
