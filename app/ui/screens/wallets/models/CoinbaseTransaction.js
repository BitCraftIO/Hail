import Db from "hail/app/localstorage/db/Db";
import Realm from "realm";

//https://developers.coinbase.com/api/v2?shell#transactions
export default class CoinbaseTransaction extends Realm.Object{}
CoinbaseTransaction.schema = {
    name: "CoinbaseTransaction",
    primaryKey: "id",
    properties: {
        //Created by Coinbase
        id: "int",
        type: "string",
        currency: "string",
        amount: "int",
        to: "string",
        toType: "string",
        description: "string?"
    }
};