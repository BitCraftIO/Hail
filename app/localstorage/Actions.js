import DbHelper from "./db/DbHelper";
import Queries from ".Queries";

//Realm write operations are synchronous
export default class Actions {

	//See Wallet.js for needed options
	createWallet(options) {
		DbHelper.getInstanct().insert("Wallet", options);
	}

	createExchangeWallet(options) {

	}

	//Can be used to delete exchange wallets
	deleteWalletById(id: num) {
		DbHelper.getInstanct().delete('Wallet', Queries.getWallet(id));
	}

	updateWalletById(id: num, options) {
		DbHelper.getInstanct().update(Queries.getWallet(id), options);
	}


}