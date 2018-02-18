import Realm from "realm";

export default class ETHWallet extends Realm.Object {}
ETHWallet.schema = {
	name: "ETHWallet",
	primaryKey: "id",
	properties: {
        id: "int",
        //main, ropsten, kovan, rinkeby as of early 2018
		network: "string",
		name: "string",
		masterKey: "string",
        publicKey: "string",
        address: "string[]",
		transactions: "ETHTransaction?[]"
	}
};