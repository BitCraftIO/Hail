import Realm from "realm";
import config from "./config";
import BTCTransaction from "hail/app/ui/screens/wallets/models//BTCTransaction";
import LTCTransaction from "hail/app/ui/screens/wallets/models//LTCTransaction";
import BTCWallet from "hail/app/ui/screens/wallets/models//BTCWallet";
import LTCWallet from "hail/app/ui/screens/wallets/models//LTCWallet";
import BitstampWallet from "hail/app/ui/screens/wallets/models//BitstampWallet";

export let realm = new Realm({
	schema: [
		BTCWallet, 
		BTCTransaction, 
		LTCWallet, 
		LTCTransaction, 
		BitstampWallet
	],
	path: config.db_path,
});

export function query(model, filter) {
	let results = this.realm.objects(model);
	if(filter) {
		return results.filtered(filter);
	}
	return results;
};

export function insert(model, options) {
	this.write(() => {
		realm.create(model, options);
	});
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
		throw new Error('Db.js :: Write operation failed');
	}
};

export function close() {
	Realm.close()
};

export function createRealm() {

};

console.log(realm.path);
