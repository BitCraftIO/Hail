import * as Db from 'hail/app/localstorage/db/Db';
import Realm from 'realm';

export default class APIWallet extends Realm.Object {}
APIWallet.schema = {
    name: 'APIWallet',
    primaryKey: 'id',
    properties: {
        id: 'int',
        api: 'string',
        apiKey: 'string?',
        name: 'string?',
        //Sometimes called bearer token
        accessToken: 'string?',
        refreshToken: 'string?',
        accounts: { type: 'APIAccount[]', default: [] }
    }
};
