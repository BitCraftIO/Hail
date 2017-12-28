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

/*
	createWalletLocally -- It is best if the output of a call to create a wallet is used as the input.

	@param network
	@param name
	@param masterKey
	@param id
	@param receiveAddresses
	@param changeAddress
	@param transactions
*/
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
			});
		});
	})
	.then(() => {
		return true
	})
	.catch((err) => {
		console.log(err);
		return false;
	})

}

export function deleteWalletLocallyById(id: number) {
	Realm.open({schema: [walletSchema, transactionSchema]})
	.then(realm => {
		realm.write(() => {
			realm.delete(realm.objects('Wallet').filtered('id = {}', id));
		});
	})
	.then(() => {
		return true;
	})
	.catch((err) => {
		console.log(err);
		return false;
	})
}

export function addAddressToWallet(wallet, address) {

}

export function addTxToWalletById(tx, id) {

}

export function addTxToWalletByAddress(tx, id) {

}

export function getWalletById(id: number){
    return new Promise((resolve, reject) => {
    	realm.objects('Wallet').filtered('id = {}', id)
    	.then(docs => {
    		if docs.count > 1 {
    			reject("More than one result");
    		} else {
    			resolve(docs);
    		}
    	})
    	.catch(err => reject(err))
    }
}