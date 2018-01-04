import * as Db from "./db/Db";
import * as queries from "./Queries";

//Realm write operations are synchronous


//See Wallet.js for needed options
export function createWallet(options) {
	Db.insert("Wallet", options);
}

export function createExchangeWallet(options) {

}

//Can be used to delete exchange wallets
export function deleteWalletById(id) {
	Db.delete('Wallet', queries.getWalletbyId(id));
}

export function updateWalletById(id, options) {
	Db.update(queries.getWalletbyId(id), options);
}