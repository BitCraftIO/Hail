const Realm = require('realm');

const walletSchema = {
	name: 'wallet'
	properties: {
		network: 'string',
		name: 'string',
		masterKey: 'string',
		id: {type: 'int', default: },
		receiveAddresses: 'Address[]',
		changeAddress: 'Address',
		transactions: 'Transaction[]'
	}
};