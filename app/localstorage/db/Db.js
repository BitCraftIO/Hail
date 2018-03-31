import Realm from 'realm';
import config from './config';
import Wallet from './models/Wallet';
import WalletAddress from './models/WalletAddress';
import WalletTransaction from './models/WalletTransaction';
import Log from './models/Log';
//import { logger } from '../../utils/Logger';
import APITransaction from './models/APITransaction';
import APIWallet from './models/APIWallet';
import APIAccount from './models/APIAccount';
import Configuration from './models/Configuration';

export function realm() {
    if (this.r == undefined) {
        this.r = new Realm({
            schema: [Wallet, WalletAddress, WalletTransaction, Log, APIWallet, APITransaction, APIAccount, Configuration],
            path: config.db_path
        });
        //logger(2, this.r.path);
    }

    return this.r;
}

//https://realm.io/docs/javascript/latest/#to-many-relationships
export function doOneToMany(one, many) {
    many.forEach(m => {
        this.write(() => {
            one.push(m);
        });
    });
}

export function query(model, filter) {
    let results = this.realm().objects(model);
    if (filter) {
        return results.filtered(filter);
    }
    return results;
}

/*
	Side note: You can create sub classes recursively. Let's see how that works 
	https://realm.io/docs/javascript/latest/#creating-objects
	
*/

export function insert(model, options) {
    if (options == undefined && model instanceof Realm.Object) {
        this.write(() => {
            realm().create(model);
        });
    } else {
        this.write(() => {
            realm().create(model, options);
        });
    }
}

export function update(obj, options) {
    this.write(() => {
        Object.keys(options).map((key, attribute) => {
            obj[key] = attribute;
        });
    });
}

export function del(model, obj) {
    this.write(() => {
        realm().delete(obj);
    });
}

export function write(func) {
    try {
        realm().write(func);
    } catch (e) {
        logger(0, e);
        throw new Error('Db.js :: Write operation failed ::', e);
    }
}

export function close() {
    Realm.close();
}
