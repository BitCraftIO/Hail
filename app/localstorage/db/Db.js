import { Object } from "realm";

//@flow
export const realm = null;

export default class Db {
	
	constructor(props) {
		super(props);
		if (realm === null) {realm = require("realm");};
	}

	query(model: string, filter?: string) {
		let results = this.realm.objects(model);
		if(filter) {
			return results.filtered(filter);
		}
		return results;
	}
	
	delete(model:string, obj) {
		this.write(() => {
			realm.delete(obj);
		});
	}

	insert(model: string, options) {
		this.write(() => {
			realm.create(model, options);
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
		realm.write(func);
	}

	close() {
		realm.close()
	}
	
	createRealm() {

	}
}