import Realm from "realm";
import config from "./config";
import BTCTransaction from "../models/BTCTransaction";
import LTCTransaction from "../models/LTCTransaction";
import BTCWallet from "../models/BTCWallet";
import LTCWallet from "../models/LTCWallet";
import BitstampWallet from "../models/BitstampWallet";

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
