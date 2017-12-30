import Db from "../db/Db";

export default class WalletModel extends Db.realm.Object{}
WalletModel.schema - {
	name: "Wallet",
	properties: {
		network: "string",
		name: "string",
		masterKey: "string",
		id: {type: "int", default: 0},
		receiveAddresses: "string[]",
		changeAddress: "string",
		transactions: "Transaction[]"
	}
};