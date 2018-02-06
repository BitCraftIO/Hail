import Db from "hail/app/localstorage/db/Db";
import Realm from "realm";

//https://developers.coinbase.com/api/v2?shell#accounts
export default class CoinbaseAccount extends Realm.Object{}
CoinbaseAccount.schema = {
    name: "CoinbaseAccount",
    primaryKey: "id",
    properties: {
        //Created by Coinbase
        id: "string",
        currency: "string",
        transactions: {type:"CoinbaseTransaction[]", default: []},
        name: "string?",
    }
};