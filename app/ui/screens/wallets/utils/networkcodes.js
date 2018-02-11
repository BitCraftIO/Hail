export const coinToCode = {
    "BTC":"0001",
    "LTC":"0002",
}

export const exchangeToCode = {
    "Bitstamp":"0001",
}

export const codeToCoin = () => {
    var ret = {};
    for(var coin in coinToCode){
        ret[coinToCode[coin]] = key;
    }
    return ret;
}

export const codeToExchange = () => {
    var ret = {};
    for(var exchange in exchangeToCode){
        ret[exchangeToCode[exchange]] = key;
    }
    return ret;
}