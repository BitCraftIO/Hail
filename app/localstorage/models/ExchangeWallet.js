import Db from "../db/Db";

export default class ExchangeWallet extends Db.realm.Object{}
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