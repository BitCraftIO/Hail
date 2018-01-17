import * as Db from "./db/Db";
import * as queries from "./Queries";
import * as idhelper from "./utils/idhelper";
import * as networkCodes from "./utils/networkcodes";

//Realm write operations are synchronous


/*
	See <coin>Wallet.js for needed options
	@param type: local or exchange
	@param coin: ex, BTC, LTC, ETH etc...
*/
export function createWallet(options) {
	Db.insert(options.network+"Wallet", options);
}

export function createExchangeWallet(options) {

}

//Can be used to delete exchange wallets
export function deleteWalletById(id) {
	Db.delete(idhelper.getModelForId(id), queries.getWalletbyId(id));
}

export function updateWalletById(id, options) {
	Db.update(queries.getWalletbyId(id), options);
}