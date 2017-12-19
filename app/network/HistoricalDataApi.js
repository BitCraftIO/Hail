// @flow

export function getBitcoinData() : Promise<Object> {
    return fetch("https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2013-10-15")
        .then((response) => response.json());
}