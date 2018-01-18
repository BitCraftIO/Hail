import Db from "hail/app/localstorage/db/Db";
import Realm from "realm";

export default class BTCTransaction extends Realm.Object{}
BTCTransaction.schema = {
	name: "BTCTransaction",
	primaryKey: "id",
	properties: {
		id: "int",
		tx: "string",
		fee: "int",
		input: "string[]",
		output: "string[]"
	}
};