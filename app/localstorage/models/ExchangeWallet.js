import Db from "../db/Db";
import Realm from "realm";

export default class ExchangeWallet extends Realm.Object {}
ExchangeWallet.schema = {
	name: "ExchangeWallet",
	primaryKey: "id",
	properties: {
		id: "int",
		pos: "int",
		host: "string",
		apiKey: "string",

		//bitstamp https://www.bitstamp.net/api/
		nonce: {type: "int", default: 0},
	}
};