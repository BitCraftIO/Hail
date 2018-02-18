import Realm from "realm";

export default class ETHTransaction extends Realm.Object {}
ETHTransaction.schema = {
	name: "ETHTransaction",
	primaryKey: "id",
	properties: {
        id: "int",
		nonce: 'int',
		gasLimit: "double",
		to: "string", 
		value: "double", 
		data: "string",
		// EIP 155 chainId - mainnet: 1, ropsten: 3
		chainId: "int",
	}
};