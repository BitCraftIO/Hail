// @flow

import {repeat} from "../Utils";

const DEFAULT_EXCHANGE = "CCCAGG";

function now() : number {
    return Math.floor(Date.now() / 1000);
};

// documentation: https://www.cryptocompare.com/api/#-api-data-histohour-

export function pricesByTheDay(coin: string, days: number) {
    const url = `https://min-api.cryptocompare.com/data/histoday?tryConversion=false&tsym=USD&aggregate=1&fsym=${coin}&limit=${days}&e=${DEFAULT_EXCHANGE}`;
    return fetch(url)
        .then((response) => response.json());
}

export function pricesByTheHour(fromTime: number, coin: string): Promise<Object> {
    const dataPoints = Math.floor(((now() - fromTime) / 60) / 60); // (seconds / 60 / 60) = hours
    const url = `https://min-api.cryptocompare.com/data/histohour?tryConversion=false&tsym=USD&aggregate=1&fsym=${coin}&limit=${dataPoints}&e=${DEFAULT_EXCHANGE}&toTs=${fromTime}`;
    return fetch(url)
        .then((response) => response.json());
}

/*
 Note that this function gets as many 2000 minute increments as it can.
 Maybe it'd be a good idea to make a function that gets x minute increments too.
 Also note that the API is limited to the last 7 days
*/
export function pricesByTheMinute(fromTime: number, coin: string) : Promise<Array<Object>> {
    const minutes = (now() - fromTime) / 60 // (seconds / 60) = minutes
    const MAX_CRYPTOCOMPARE_MINUTES = 2000;
    const numOfCallsToMake = Math.floor(minutes / MAX_CRYPTOCOMPARE_MINUTES);
    let callIncrements = [];

    repeat(numOfCallsToMake, (i) => {
        const incrementToSeconds = (MAX_CRYPTOCOMPARE_MINUTES * i) * 60;
        callIncrements.push(fromTime - incrementToSeconds);
    })();

    callIncrements.shift(); // first one goes passed the 7 day limit so we don't need it

    const calls = [];
    callIncrements.forEach((fromTimeIncrement) => {
        const call = fetch(`https://min-api.cryptocompare.com/data/histominute?tryConversion=false&tsym=USD&aggregate=1&fsym=${coin}&limit=${MAX_CRYPTOCOMPARE_MINUTES}&e=CCCAGG&toTs=${fromTimeIncrement}`)
            .then((response) => response.json());
        calls.push(call);
    });

    return new Promise((resolve, reject) => {
        Promise.all(calls).then(function(responses) {
            const aggregated = responses.reduce((accum, val) => accum.concat(val.Data), []);
            resolve(aggregated);
        }, (err) => {
            reject(err);
        });
    });
}


export function getBitcoinData(): Promise<Object> {
    return fetch("https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2013-10-15")
        .then((response) => response.json());
}