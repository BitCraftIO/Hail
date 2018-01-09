import Db from "../db/Db";
import Realm from "realm";

export default class LTCwallet extends Realm.Object {}
LTCwallet.schema = {
	name: "LTCwallet",
	primaryKey: "id",
	properties: {
		id: "int",
		network: "string",
		name: "string",
		masterKey: "string",
		receiveAddresses: "string[]",
		changeAddress: "string",
		transactions: "Transaction[]"
	}
};