export const coinToCode = {
    "BTC":"0001",
   // "BTCT":"0002",
    "LTC":"0003",
}

export const exchangeToCode = {
    // "Bitstamp":"0001",
    // "Coinbase":"0002",
}

export const codeToCoin = () => {
    var res = {};
    for(var coin in coinToCode){
        res[coinToCode[coin]] = coin;
    }
    return res;
}

export const codeToExchange = () => {
    var res = {};
    for(var exchange in exchangeToCode){
        res[exchangeToCode[exchange]] = exchange;
    }
    return res;
}