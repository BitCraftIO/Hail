import Db from 'hail/app/localstorage/db/Db';
import Realm from 'realm';

export default class APITransaction extends Realm.Object {}
APITransaction.schema = {
    name: 'APITransaction',
    primaryKey: 'id',
    properties: {
        //https://developers.coinbase.com/api/v2?shell#transactions
        id: 'string',
        type: 'string',
        currency: 'string',
        amount: 'double',
        to: 'string',
        toType: 'string',
        description: 'string?'
    }
};
