import Realm from 'realm';

export default class Log extends Realm.Object {}
Log.schema = {
    name: 'Log',
    primaryKey: 'id',
    properties: {
        id: { type: 'int', default: 0 },
        date: 'date',
        logLevel: 'int',
        component: 'string?',
        message: 'string'
    }
};

/*
    Log Levels | default setting

    0 - error    log
    1 - warn     log
    2 - info     log
    3 - debug    off
    4 - trace    off
*/
