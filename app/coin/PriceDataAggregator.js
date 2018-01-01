// @flow
import type { Interval } from "../utils/TimeUtils";
import { HOUR, MINUTE, ONE_HOUR_IN_SECONDS, ONE_MINUTE_IN_SECONDS } from "../utils/TimeUtils";
import type { CoinPrice } from "./CoinPrice";

/**
 *
 * @param priceData - array of prices sorted from earliest to latest
 * @param interval
 */
export default function aggregate(priceData: Array<CoinPrice>, interval: Interval): Array<CoinPrice> {
    let seekEndTime = 0;
    let extender = calculateAmountToExtendTimeBy(interval);
    return priceData.reduce((accumulator, price) => {
        if (seekEndTime < price.time) {
            seekEndTime = price.time + extender;
            accumulator.push(price)
        }

        return accumulator;
    }, []);
}

function calculateAmountToExtendTimeBy(interval: Interval) {
    switch (interval.unit) {
        case MINUTE:
            return interval.amount * ONE_MINUTE_IN_SECONDS;
        case HOUR:
            return interval.amount * ONE_HOUR_IN_SECONDS;
        default:
            throw "Invalid interval timeunit: " + interval.unit + ". Can only be minute or hour";
    }
}