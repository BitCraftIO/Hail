import Db from "../db/Db";
import Realm from "realm";

export default class Transaction extends Realm.Object{}
Transaction.schema = {
	name: "Transaction",
	primaryKey: "id",
	properties: {
		id: "int",
		tx: "string",
		fee: "int",
		input: "string[]",
		output: "string[]"
	}
};