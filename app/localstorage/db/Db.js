//@flow
import Realm from "realm";
export default class Db {
	
	constructor() {
		//if (realm === null) {realm = require("realm");};
	}

	query(model: string, filter?: string) {
		let results = this.Realm.objects(model);
		if(filter) {
			return results.filtered(filter);
		}
		return results;
	}
	
	delete(model:string, obj) {
		this.write(() => {
			Realm.delete(obj);
		});
	}

	insert(model: string, options) {
		this.write(() => {
			Realm.create(model, options);
		});
	}

	update(obj, options) {
		this.write(() => {
			Object.keys(options).map((key, attribute) => {
				obj[key] = attribute;
			});
		});
	}

	write(func){
		try {
			Realm.write(func);
		} catch(e) {
			throw new Error('Db.js :: Write operation failed');
		}
	}

	close() {
		Realm.close()
	}
	
	createRealm() {

	}
}