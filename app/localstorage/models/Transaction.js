import Db from "../db/Db";

export default class Transaction extends Db.realm.Object{}
Transaction.schema = {
	name: "Transaction",
	primaryKey: "id",
	properties: {
		id: "num",
		tx: "string",
		fee: "int",
		input: "string[]",
		output: "string[]"
	}
};