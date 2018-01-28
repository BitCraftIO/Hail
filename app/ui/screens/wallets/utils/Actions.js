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
	if (!options.id & options.network){
		options.id = idhelper.createId("exchange", options.network);
	} else {throw new Error("Actions.js :: required Network option null");}
	Db.insert(options.network+"Wallet", options);
	return options.id;
}

// export function createExchangeWallet(options) {
// 	if (!options.id){
// 		options.id = idhelper.createId("exchange", options.network);
// 	}
// 	//wouldn't it be nice if this returned the created wallet? 
// 	this.createWallet(options);
// }

export function registerExchangeWallet(options) {

}

//Can be used to delete exchange wallets
export function deleteWalletById(id) {
	Db.del(idhelper.getModelForId(id), queries.getWalletbyId(id));
}

export function updateWalletById(id, options) {
	Db.update(queries.getWalletbyId(id), options);
}