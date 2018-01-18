import * as queries from "./Queries";
import {coinToCode, exchangeToCode, codeToCoin, codeToExchange} from "./networkcodes";

export function createId(walletType, implementationCode) {
    var id = ""
    if (walletType === "local") {
        id = "1" + coinToCode[implementationCode];
    }
    else if (walletType === "exchange") {
        id = "2" + exchangeToCode[implementationCode];
    }
    else {
        throw new Error("idhelper.js :: walletType was not provided, createId failed");
    }

    var checked = false;
    while (!checked) {
        var tryId = randomIdGenerator()
        if (queries.getWalletbyId(id+tryId) == 0) {
            checked = true
            id += tryId;
        }
    }
    return Number(id);
}

export function getModelForId(id) {
    id = String(id);
    if (id[0] == 1) {
        if (!codeToCoin[id.substring(1, 5)]){
            throw new Error("idhelper.js :: id "+id+" did not match");
        }
        return codeToCoin[id.substring(1, 5)]+"Wallet";
    }
    else if (id[0] == 2) {
        if (!codeToExchange[id.substring(1, 5)]){
            throw new Error("idhelper.js :: id "+id+" did not match");
        }
        return codeToExchange[id.substring(1, 5)]+"Wallet";
    }
    throw new Error("idhelper.js :: id "+id+" did not match");

}

function randomIdGenerator() {
    return Math.floor(Math.random()*100000)
}