import Db from "hail/app/localstorage/db/Db";
import Realm from "realm";

export default class LTCWallet extends Realm.Object {}
LTCWallet.schema = {
	name: "LTCWallet",
	primaryKey: "id",
	properties: {
		id: "int",
		network: "string",
		name: "string",
		masterKey: "string",
		receiveAddresses: "string[]",
		changeAddress: "string",
		transactions: "LTCTransaction[]"
	}
};