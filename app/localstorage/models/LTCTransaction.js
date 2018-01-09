import Db from "../db/Db";
import Realm from "realm";

export default class LTCTransaction extends Realm.Object{}
LTCTransaction.schema = {
	name: "LTCTransaction",
	primaryKey: "id",
	properties: {
		id: "int",
		tx: "string",
		fee: "int",
		input: "string[]",
		output: "string[]"
	}
};