import * as Db from "hail/app/localstorage/db/Db";
import * as queries from "./Queries";
import * as idhelper from "./idhelper";
import * as networkCodes from "./networkcodes";
import * as CoinbaseAPI from "../network/exchanges/CoinbaseAPI";

//Realm write operations are synchronous


/*
    See <coin>Wallet.js for needed options
    @param network: ex, BTC, LTC, ETH, Coinbase, etc...
    @param name: (optional) name of the wallet given by user, not required for exchanges
    @param id: (optional) generated using idhelper
    @param apiKey: (optional) for the use of an exchange using apiKey, not required for localwallets or exchanges that use oauth flow
*/
export function createWallet(options) {
	Db.insert(options.network+"Wallet", options);
}

export function createExchangeWallet(options) {
	if (!options.id){
		options.id = idhelper.createId("exchange", options.network);
	}
	//wouldn't it be nice if this returned the created wallet? 
	this.createWallet(options);
	alert(`You will now Leave Hail and go to ${options.network}`);

	//TODO: Change this to use an object of functions cause that's cooler
	switch(options.network) {
		case "Coinbase": 
			queries.getWalletbyId(options.id).authorize();
			break;
		default:
			console.log(`${options.network} is not a valid network`)
	}
}

export function registerExchangeWallet(options) {

}

//Can be used to delete exchange wallets
export function deleteWalletById(id) {
	Db.del(idhelper.getModelForId(id), queries.getWalletbyId(id));
}

export function updateWalletById(id, options) {
	Db.update(queries.getWalletbyId(id), options);
}