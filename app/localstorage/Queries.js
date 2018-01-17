import * as Db from "./db/Db";
import * as idhelper from "./utils/idhelper";
import * as networkCodes from "./utils/networkcodes";

export function getWalletbyId(id) {
    let results = Db.query(idhelper.getModelForId(id), 'id = ' + id);
    if (results.length == 0){
        return null;
    }
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