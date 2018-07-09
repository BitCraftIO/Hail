import Realm from 'realm';

export default class Configuration extends Realm.Object {}
Configuration.schema = {
    name: 'Configuration',
    primaryKey: 'id',
    properties: {
        id: { type: 'string', default: '01001000' },
        created: { type: 'bool', default: true },
        logLevel: { type: 'int', default: 2 },
        stopSyncing: { type: 'bool', default: false },
        dumpSyncMemory: { type: 'bool', default: false },
        syncPeriod: { type: 'int', default: 900000 } //minutes
    }
};
