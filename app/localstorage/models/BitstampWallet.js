import Db from "../db/Db";
import Realm from "realm";

export default class BitstampWallet extends Realm.Object {}
BitstampWallet.schema = {
	name: "BitstampWallet",
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