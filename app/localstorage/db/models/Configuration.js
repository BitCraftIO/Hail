import Realm from 'realm';

export default class Configuration extends Realm.Object {}
Configuration.schema = {
    name: 'Configuration',
    primaryKey: 'id',
    properties: {
        id: 'int',
        logLevel: { type: 'int', default: 2 }
    }
};
