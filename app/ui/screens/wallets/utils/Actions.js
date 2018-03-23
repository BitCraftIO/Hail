// @flow
import * as Db from 'hail/app/localstorage/db/Db';
import * as queries from './Queries';
import * as idhelper from './idhelper';
import * as networkCodes from './networkcodes';

//Realm write operations are synchronous

/**
 *
 * @param {*} coin
 * @param {*} network
 * @param {*} name
 * @param {*} walletType
 * @param {*} address
 * @param {*} privateKey
 * @param {*} extendedPrivateKey
 */
export function createWallet(options) {
    options.id = Math.floor(Math.random() * 1000000000);
    Db.insert('Wallet', options);
    return { privateKey: options.privateKey, address: options.address.address };
}

/*
	@param one: the thing to be attached to. Ex. const one = wallet.addresses
	@param many: the thing to attach. Must be in list
*/
export function append(one, many: List) {
    Db.doOneToMany(one, many);
}

export function deleteWallet(wallet) {
    Db.del(wallet);
}

//Can be used to delete exchange wallets
export function deleteWalletById(id) {
    Db.del(queries.getWalletbyId(id));
}

export function updateWalletById(id, options) {
    Db.update(queries.getWalletbyId(id), options);
}

function idGenerator() {
    return Math.floor(Math.random() * 1000000000);
}
