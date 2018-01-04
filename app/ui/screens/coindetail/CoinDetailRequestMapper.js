// @flow

import {getNewsItems} from "../../../coin/CoinNews";
import type {CoinNewsItem} from "../../../coin/CoinNews";
import type { CoinPrice } from "../../../coin/CoinPrice";
import aggregate from "../../../coin/PriceDataAggregator";
import { pricesByTheMinute, pricesByTheDay, pricesByTheHour } from "../../../network/HistoricalPricesApi"
import {
    DAY, calculateFromTime, MINUTE, ONE_DAY_IN_MINUTES, ONE_HOUR_IN_MINUTES, HOUR, ONE_WEEK_IN_DAYS,
    ONE_MONTH_IN_DAYS, ONE_YEAR_IN_DAYS
} from "../../../utils/TimeUtils";

export type CoinGraphData = {
    hour: Array<CoinPrice>,
    day: Array<CoinPrice>,
    week: Array<CoinPrice>,
    month: Array<CoinPrice>,
    year: Array<CoinPrice>
}

// TODO: make a graph options type for readability
export async function getCoinGraphData(coinName: string): Promise<CoinGraphData> {
    const oneWeekAgo = calculateFromTime({amount: ONE_WEEK_IN_DAYS, unit: DAY});
    const oneMonthAgo = calculateFromTime({amount: ONE_MONTH_IN_DAYS, unit: DAY});

    const [
        oneWeekByTheMinute,
        oneMonthByTheHour,
        oneYearByTheDay
    ] = await Promise.all([
        pricesByTheMinute(oneWeekAgo, coinName),
        pricesByTheHour(oneMonthAgo, coinName),
        pricesByTheDay(ONE_YEAR_IN_DAYS, coinName)]);

    /*
        Graph intervals:
        1 hour : 1 minute ticks
        1 day : 5 minute ticks
        1 week : 30 minute ticks
        1 month : 2 hour ticks
        1 year : 1 day ticks
    */
    const lastHourByTheMinute = oneWeekByTheMinute.slice(0, ONE_HOUR_IN_MINUTES);
    const lastDayByTheMinute = oneWeekByTheMinute.slice(0, ONE_DAY_IN_MINUTES);
    const aggregatedDayByMinute = aggregate(lastDayByTheMinute, {unit: MINUTE, amount: 5});
    const aggregatedWeekByMinute = aggregate(oneWeekByTheMinute, {unit: MINUTE, amount: 30});
    const aggregatedMonthByHour = aggregate(oneMonthByTheHour, {unit: HOUR, amount: 2});

    return {
        hour: lastHourByTheMinute,
        day: aggregatedDayByMinute,
        week: aggregatedWeekByMinute,
        month: aggregatedMonthByHour,
        year: oneYearByTheDay
    };
}

export async function getNews(coinName: string): Promise<Array<CoinNewsItem>> {
    return getNewsItems(coinName);
}