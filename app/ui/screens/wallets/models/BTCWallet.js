import Realm from "realm";

export default class BTCWallet extends Realm.Object {}
BTCWallet.schema = {
	name: "BTCWallet",
	primaryKey: "id",
	properties: {
		id: "int",
		//test or main
		network: "string",
		name: "string",
		masterKey: "string",
		receiveAddresses: "string[]",
		changeAddress: "string",
		transactions: "BTCTransaction[]"
	}
};