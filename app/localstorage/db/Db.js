import Realm from "realm";
import config from "./config";
import BTCTransaction from "hail/app/ui/screens/wallets/models/BTCTransaction";
import LTCTransaction from "hail/app/ui/screens/wallets/models/LTCTransaction";
import BTCWallet from "hail/app/ui/screens/wallets/models/BTCWallet";
import LTCWallet from "hail/app/ui/screens/wallets/models/LTCWallet";
import BitstampWallet from "hail/app/ui/screens/wallets/models/BitstampWallet";
import CoinbaseWallet from "hail/app/ui/screens/wallets/models/CoinbaseWallet";
import CoinbaseAccount from "hail/app/ui/screens/wallets/models/CoinbaseAccount";
import CoinbaseTransaction from "hail/app/ui/screens/wallets/models/CoinbaseTransaction";



export let realm = new Realm({
	schema: [
		BTCWallet, 
		BTCTransaction, 
		LTCWallet, 
		LTCTransaction, 
		BitstampWallet,
		CoinbaseWallet,
		CoinbaseAccount,
		CoinbaseTransaction
	],
	path: config.db_path,
});

//https://realm.io/docs/javascript/latest/#to-many-relationships
export function doOneToMany(one, many) {
	many.forEach(m => {
		this.write(() => {
			one.push(m);
		});
	});
}

export function query(model, filter) {
	let results = this.realm.objects(model);
	if(filter) {
		return results.filtered(filter);
	}
	return results;
};

/*
	Side note: You can create sub classes recursively. Let's see how that works 
		https://realm.io/docs/javascript/latest/#creating-objects
	
*/
export function insert(model, options) {
	if (options == undefined && model instanceof Realm.Object){
		this.write(() => {
			realm.create(model);
		});
	} 
	else {
		this.write(() => {
			realm.create(model, options);
		});
	}
};

export function del(model, obj) {
	this.write(() => {
		realm.delete(obj);
	});
};

export function update(obj, options) {
	this.write(() => {
		Object.keys(options).map((key, attribute) => {
			obj[key] = attribute;
		});
	});
};

export function write(func){
	try {
		realm.write(func);
	} catch(e) {
		throw new Error('Db.js :: Write operation failed ::', e);
	}
};

export function close() {
	Realm.close()
};

export function createRealm() {

};

console.log(realm.path);
