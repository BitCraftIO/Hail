import Realm from 'realm';

export default class WalletAddress extends Realm.Object {}
WalletAddress.schema = {
    name: 'WalletAddress',
    primaryKey: 'string',
    properties: {
        string: 'string',
        signingKey: 'data',
        derivationPath: 'string',
        type: 'string'
    }
};
