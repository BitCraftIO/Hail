import Realm from 'realm';

export default class Log extends Realm.Object {}
Log.schema = {
    name: 'Log',
    properties: {
        date: 'date',
        logLevel: 'int',
        component: 'string?',
        message: 'string'
    }
};
