import Realm from 'realm';

export default class HDWalletTransaction extends Realm.Object {}
HDWalletTransaction.schema = {
    name: 'HDWalletTransaction',
    primaryKey: 'id',
    properties: {
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
