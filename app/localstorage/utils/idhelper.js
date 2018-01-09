import * as queries from "../Queries";

export function createId(walletType, implementationCode) {
    var id = ""
    if (walletType === "local") {
        id = "1";
        switch (implementationCode) {
            case "BTC":
                id += "0001"
                break;
            case "LTC":
                id += "0002"
                break;
            default:
                throw new Error("idhelper.js :: implementationCode "+implementationCode+" did not match");
                break;

        }
    }
    else if (walletType === "exchange") {
        id = "2"
        switch (implementationCode) {
            case "Bitfinex":
                id += "0001"
            default:

        }
    }
    else {
        throw new Error("idhelper.js :: walletType was not provided, createId failed");
    }

    var checked = false;
    while (!checked) {
        var tryId = randomIdGenerator()
        if (queries.getWalletbyId(id+tryId) != null) {
            checked = true
            id += tryId;
        }
    }
    return Number(id);
}

export function getModelForId(id) {
    id = String(id);
    if (id[0] == 1) {
        switch (id.substring(1, 5)) {
            case '0001':
                return "BTCWallet";
                break;
            case '0002':
                return "LTCWallet";
                break;
            default: 
                break;
        }
    }
    else if (id[0] == 2) {
        switch (id.substring(1, 5)) {
            case '0001':
                return "BitfinexWallet";
                break;
            default: 
                break;
        }
    }
    throw new Error("idhelper.js :: id "+id+" did not match");

}

function randomIdGenerator() {
    return Math.floor(Math.random()*100000)
}