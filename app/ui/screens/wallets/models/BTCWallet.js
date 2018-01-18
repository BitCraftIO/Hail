import Db from "hail/app/localstorage/db/Db";
import Realm from "realm";

export default class BTCWallet extends Realm.Object {}
BTCWallet.schema = {
	name: "BTCWallet",
	primaryKey: "id",
	properties: {
		id: "int",
		network: "string",
		name: "string",
		masterKey: "string",
		receiveAddresses: "string[]",
		changeAddress: "string",
		transactions: "BTCTransaction[]"
	}
};