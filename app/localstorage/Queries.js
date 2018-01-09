import * as Db from "./db/Db";

export function getWalletbyId(id) {
    let results = Db.query('Wallet', 'id = ' + id);
    if (results.length == 0){
        return null;
    }
    return results;
}

export function getExchangeWallets() {
    let results = Db.query('ExchangeWallet');
    return results;
}

export function getLocalWallets(){
    let results = Db.query('Wallet');
    return results;
}