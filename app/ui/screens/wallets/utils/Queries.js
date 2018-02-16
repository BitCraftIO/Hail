import * as Db from "hail/app/localstorage/db/Db.js";
import * as idhelper from "./idhelper";
import * as networkCodes from "./networkcodes";

/*
 TODO: 
 move this to /app/screen/wallets/models
*/
export function getWalletbyId(id) {
    let results = Db.query(idhelper.getModelForId(id), 'id = ' + id);
    return results;
}

export function getExchangeWallets() {
    results = [];
    for (var exchange in networkCodes.exchangeToCode) {
        results = results.concat(Array.from(Db.query(exchange+"Wallet")));
    }
    return results;
}

export function getLocalWallets(){
    results = [];
    for (var coin in networkCodes.coinToCode) {
        results = results.concat(Array.from(Db.query(coin+"Wallet")));
    }
    return results;
}