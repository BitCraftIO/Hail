import Realm from 'realm';

export default class Configuration extends Realm.Object {}
Configuration.schema = {
    name: 'Configuration',
    primaryKey: 'id',
    properties: {
        id: 'string',
        created: { type: 'boolean', default: true },
        logLevel: { type: 'int', default: 2 }
    }
};
