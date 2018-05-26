import Realm from 'realm';

export default class Configuration extends Realm.Object {}
Configuration.schema = {
    name: 'Configuration',
    primaryKey: 'id',
    properties: {
        id: { type: 'string', default: '01001000' },
        created: { type: 'bool', default: true },
        logLevel: { type: 'int', default: 2 }
    }
};
