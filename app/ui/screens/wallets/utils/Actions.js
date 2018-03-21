// @flow
import * as Db from 'hail/app/localstorage/db/Db';
import * as queries from './Queries';
import * as idhelper from './idhelper';
import * as networkCodes from './networkcodes';

//TODO: conform to new refactor plan
//Realm write operations are synchronous

/*
    See <coin>Wallet.js for needed options
    @param network: ex, BTC, LTC, ETH, Coinbase, etc...
    @param name: (optional) name of the wallet given by user, not required for exchanges
    @param id: (optional) generated using idhelper
    @param apiKey: (optional) for the use of an exchange using apiKey, not required for localwallets or exchanges that use oauth flow
*/
export function createWallet(options) {
    if (!options.id && options.network) {
        options.id = idhelper.createId('exchange', options.network);
    } else {
        throw new Error('Actions.js :: required Network option null');
    }
    Db.insert(options.network + 'Wallet', options);
    return options.id;
}

/*
	@param one: the thing to be attached to. Ex. const one = wallet.addresses
	@param many: the thing to attach. Must be in list
*/
export function append(one, many: List) {
    Db.doOneToMany(one, many);
}

//Can be used to delete exchange wallets
export function deleteWalletById(id) {
    Db.del(idhelper.getModelForId(id), queries.getWalletbyId(id));
}

export function updateWalletById(id, options) {
    Db.update(queries.getWalletbyId(id), options);
}
