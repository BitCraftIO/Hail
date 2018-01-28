import Db from "hail/app/localstorage/db/Db";
import Realm from "realm";
import CoinbaseAPI from "../network/exchanges/CoinbaseAPI"

export default class CoinbaseWallet extends Realm.Object{

    authorize() {
        if (!coinbaseAPI.redirectToOAuth()) {
            alert("auth failed!");
        }
    }
}
CoinbaseWallet.schema = {
	name: "CoinbaseWallet",
	primaryKey: "id",
	properties: {
        id: "int",
        apiKey: "string?",
        oauth2Key: "string?",
	}
};