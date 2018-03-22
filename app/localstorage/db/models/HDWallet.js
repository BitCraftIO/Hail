import Realm from 'realm';

export default class HDWallet extends Realm.Object {}
HDWallet.schema = {
    name: 'HDWallet',
    primaryKey: 'id',
    properties: {
        name: { type: 'string', default: 'Your Wallet' },
        id: 'int',
        coin: 'string', //BTC, ETH, BCH, LTC, XMR
        network: 'string', //MAIN, TEST, ROPSTEN, RINKEBY, KOVAN
        extendedPrivateKey: 'string',
        privateKey: 'string',
        transactions: { type: 'HDWalletTransaction[]', default: [] }
    }
};
