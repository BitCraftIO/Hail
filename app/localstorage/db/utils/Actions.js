// @flow
import * as Db from 'hail/app/localstorage/db/Db';
import * as queries from './Queries';
import Logger from 'hail/app/utils/Logger';

const filename = 'Actions.js';
const logger = new Logger(filename);

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
    options.id = Number(`1${Math.floor(Math.random() * 1000000000)}`);
    Db.insert('Wallet', options);
    logger.notify('Local wallet created');
    return { privateKey: options.privateKey, address: options.addresses.string };
}

export function createAPIWallet(options) {
    options.id = Number(`2${Math.floor(Math.random() * 1000000000)}`);
    Db.insert('APIWallet', options);
    logger.notify('API wallet added');
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
    logger.notify('Wallet deleted');
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
