import Realm from 'realm';

export default class HDWalletAddress extends Realm.Object {}
HDWalletAddress.schema = {
    name: 'HDWalletAddress',
    primaryKey: 'id',
    properties: {
        address: 'string',
        derivationPath: 'string'
    }
};
