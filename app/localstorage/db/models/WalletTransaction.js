import Realm from 'realm';

export default class WalletTransaction extends Realm.Object {}
WalletTransaction.schema = {
    name: 'WalletTransaction',
    primaryKey: 'id',
    properties: {
        id: 'int',
        to: { type: 'WalletAddress[]', default: [] },
        from: { type: 'WalletAddress[]', default: [] },
        value: 'double', //negative if spent, positive if gained
        data: 'string?', //hex

        //Ethereum
        gasPrice: 'double?',
        gasLimit: 'double?',
        nonce: 'double?'
    }
};
