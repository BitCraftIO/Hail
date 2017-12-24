const Realm = require('realm');

const walletSchema = {
	name: 'Wallet'
	properties: {
		network: 'string',
		name: 'string',
		masterKey: 'string',
		id: {type: 'int', default: },
		receiveAddresses: 'string[]',
		changeAddress: 'string',
		transactions: 'Transaction[]'
	}
};

const transactionSchema = {
	name: 'Transaction',
	properties: {
		hash: 'string',
		fee: 'int',
		input: 'string[]'
		output: 'string[]'
	}
}