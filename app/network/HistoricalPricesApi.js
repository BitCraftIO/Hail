// @flow

import type { CoinPrice } from "../coin/CoinPrice";
import { repeat } from "../utils/Misc";
import { now } from"../utils/TimeUtils";

const DEFAULT_EXCHANGE = "CCCAGG";

// documentation: https://www.cryptocompare.com/api/#-api-data-histohour-

/**
 *
 * @param coin
 * @param number of days to fetch
 * @returns {Promise<any>}
 */
export async function pricesByTheDay(days: number, coin: string): Promise<Array<CoinPrice>> {
    const url = `https://min-api.cryptocompare.com/data/histoday?tryConversion=false&tsym=USD&aggregate=1&fsym=${coin}&limit=${days}&e=${DEFAULT_EXCHANGE}`;
    const json = await fetch(url).then((response) => response.json());
    return json.Data;
}

/**
 *
 * @param fromTime - the timestamp from which to start pulling prices by the hour.
 * @param coin
 * @returns {Promise<any>}
 */
export async function pricesByTheHour(fromTime: number, coin: string): Promise<Array<CoinPrice>> {
    const dataPoints = Math.floor(((now() - fromTime) / 60) / 60); // (seconds / 60 / 60) = hours
    const url = `https://min-api.cryptocompare.com/data/histohour?tryConversion=false&tsym=USD&aggregate=1&fsym=${coin}&limit=${dataPoints}&e=${DEFAULT_EXCHANGE}&toTs=${fromTime}`;
    const json = await fetch(url).then((response) => response.json());
    return json.Data;
}

/**
 * Note that this function gets as many 2000 minute increments as it can.
 * Maybe it'd be a good idea to make a function that gets x minute increments too.
 * Also note that the API is limited to the last 7 days
 *
 * @param fromTime - the timestamp from which to start pulling prices by the minute
 * @param coin
 * @returns {Promise<Array<CoinPrice>>}
 */
export function pricesByTheMinute(fromTime: number, coin: string) : Promise<Array<CoinPrice>> {
    const nowTime = now();
    const minutesBetween = (nowTime - fromTime) / 60 // (seconds / 60) = minutes
    let minutesToQueryFor = minutesBetween > 2000 ? 2000 : Math.floor(minutesBetween); // 2000 is the max allowed by the api

    let numOfCallsToMake = Math.floor(minutesBetween / minutesToQueryFor);
    if (numOfCallsToMake === 0) {
        numOfCallsToMake++;
    }

    let callIncrements = [];

    repeat(numOfCallsToMake, (i) => {
        const incrementToSeconds = (minutesToQueryFor * i) * 60;
        callIncrements.push(nowTime - incrementToSeconds);
    })();

    if (callIncrements.length >= 7) {
        callIncrements.shift(); // first one goes passed the 7 day limit so we don't need it
    }

    const calls = [];
    callIncrements.forEach((fromTimeIncrement) => {
        const call = fetch(`https://min-api.cryptocompare.com/data/histominute?tryConversion=false&tsym=USD&aggregate=1&fsym=${coin}&limit=${minutesToQueryFor}&e=CCCAGG&toTs=${fromTimeIncrement}`)
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