//TODO: Delete this
export const coinToCode = {
    BTC: '0001',
    LTC: '0003',
    ETH: '0005'
};

export const exchangeToCode = {
    Coinbase: '0002'
};

export const codeToCoin = () => {
    var res = {};
    for (var coin in coinToCode) {
        res[coinToCode[coin]] = coin;
    }
    return res;
};

export const codeToExchange = () => {
    var res = {};
    for (var exchange in exchangeToCode) {
        res[exchangeToCode[exchange]] = exchange;
    }
    return res;
};
