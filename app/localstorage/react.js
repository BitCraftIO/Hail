// @flow

const Realm = require('realm');

const walletSchema = {
	name: 'Wallet'
	properties: {
		network: 'string',
		name: 'string',
		masterKey: 'string',
		id: {type: 'int', default: 0},
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
		input: 'string[]',
		output: 'string[]'
	}
};

export function createWalletLocally(options) : Promise<boolean> {
	Realm.open({schema: [walletSchema, transactionSchema]})
	.then(realm => {
		realm.write(() => {
			realm.create('Wallet', {
				network: options.network,
				name: options.name,
				masterKey: options.masterKey,
				receiveAddresses: options.receiveAddresses,
				changeAddress: options.changeAddress
			})
		})
	})
	.then(() => {
		return true
	})
	.catch((err) => {
		return false
	})

}

export function deleteWalletLocallyById(id) {

}

export function addAddressToWallet(wallet, address) {

}

export function addTxToWalletById(tx, id) {

}

export function addTxToWalletByAddress(tx, id) {

}
