import Realm from 'realm';

export default class Wallet extends Realm.Object {}
Wallet.schema = {
    name: 'Wallet',
    primaryKey: 'id',
    properties: {
        name: { type: 'string', default: 'Your Wallet' },
        id: 'int',
        value: { type: 'double', default: 0.0 },
        walletType: 'string', //HD, PAIR,
        coin: 'string', //BTC, ETH, BCH, LTC, XMR
        network: 'string', //MAIN, TEST, ROPSTEN, RINKEBY, KOVAN
        extendedPrivateKey: 'string',
        privateKey: 'string',
        transactions: { type: 'HDWalletTransaction[]', default: [] },
        addresses: 'WalletAddress[]'
    }
};
