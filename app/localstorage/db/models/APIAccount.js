import Db from 'hail/app/localstorage/db/Db';
import Realm from 'realm';

export default class APIAccount extends Realm.Object {}
APIAccount.schema = {
    name: 'APIAccount',
    primaryKey: 'id',
    properties: {
        //https://developers.coinbase.com/api/v2?shell#accounts
        id: 'string',
        currency: 'string',
        transactions: { type: 'APITransaction[]', default: [] },
        name: 'string?'
    }
};
