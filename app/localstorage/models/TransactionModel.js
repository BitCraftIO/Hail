import Db from "../db/Db";

export default class TransactionModel extends Db.realm.Object{}
TransactionModel.schema = {
	name: "Transaction",
	properties: {
		hash: "string",
		fee: "int",
		input: "string[]",
		output: "string[]"
	}
};