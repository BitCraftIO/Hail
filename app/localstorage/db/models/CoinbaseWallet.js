import Db from "hail/app/localstorage/db/Db";
import Realm from "realm";

export default class CoinbaseWallet extends Realm.Object{}
CoinbaseWallet.schema = {
    name: "CoinbaseWallet",
    primaryKey: "id",
    properties: {
        id: "int",
        apiKey: "string?",
        name: "string?",
        //Sometimes called bearer token
        accessToken: "string?",
        refreshToken: "string?",
        accounts: {type: "CoinbaseAccount[]", default: []},
    }
};