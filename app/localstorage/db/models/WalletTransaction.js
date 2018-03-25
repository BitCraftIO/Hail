import Realm from 'realm';

export default class WalletTransaction extends Realm.Object {}
WalletTransaction.schema = {
    name: 'HDWalletTransaction',
    primaryKey: 'id',
    properties: {
        id: 'int',
        to: 'string?', //hex
        value: 'double',

        //Ethereum
        gasPrice: 'double?',
        gasLimit: 'double?',
        from: 'string?', //hex
        nonce: 'double?',
        data: 'string?' //hex
    }
};
