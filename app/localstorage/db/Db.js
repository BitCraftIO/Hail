import Realm from "realm";
import config from "./config";
import Transaction from "../models/Transaction";
import Wallet from "../models/Wallet";
import ExchangeWallet from "../models/ExchangeWallet";

let realm = new Realm({
	schema: [Wallet, Transaction, ExchangeWallet],
	path: config.db_path,
});

console.log(realm.path);

function query(model, filter) {
	let results = this.realm.objects(model);
	if(filter) {
		return results.filtered(filter);
	}
	return results;
};

function insert(model, options) {
	this.write(() => {
		realm.create(model, options);
	});
};

function del(model, obj) {
	this.write(() => {
		realm.delete(obj);
	});
};

function update(obj, options) {
	this.write(() => {
		Object.keys(options).map((key, attribute) => {
			obj[key] = attribute;
		});
	});
};

function write(func){
	try {
		realm.write(func);
	} catch(e) {
		throw new Error('Db.js :: Write operation failed');
	}
};

function close() {
	Realm.close()
};

function createRealm() {

};


module.exports = {
	query: query,
	delete: del,
	insert: insert,
	update: update,
	write: write,
	close: close,
	createRealm: createRealm,
	realm: realm,
};