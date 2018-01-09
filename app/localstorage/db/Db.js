import Realm from "realm";
import config from "./config";
import BTCTransaction from "../models/BTCTransaction";
import LTCTransaction from "../models/LTCTransaction";
import BTCWallet from "../models/BTCWallet";
import LTCWallet from "../models/LTCWallet";
import Bitstampwallet from "../models/Bitstampwallet";

let realm = new Realm({
	schema: [BTCWallet, BTCTransaction, LTCWallet, LTCTransaction, Bitstampwallet],
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