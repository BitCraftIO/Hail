import Db from "../db/Db";
import Realm from "realm";

export default class Wallet extends Realm.Object {}
Wallet.schema = {
	name: "Wallet",
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