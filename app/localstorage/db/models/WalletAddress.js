import Realm from 'realm';

export default class WalletAddress extends Realm.Object {}
WalletAddress.schema = {
    name: 'HDWalletAddress',
    primaryKey: 'id',
    properties: {
        address: 'string',
        derivationPath: 'string'
    }
};
