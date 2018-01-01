// @flow
import { pricesByTheMinute } from "../../../network/HistoricalPricesApi";
import { ONE_DAY_IN_SECONDS } from "../../../utils/TimeUtils";

export default async function getWatchlistCoinData(coin: string): Promise<Object> {
    const now = Math.floor(Date.now() / 1000);
    const prices = await pricesByTheMinute(now - ONE_DAY_IN_SECONDS, coin);
    if (prices.length === 0) {
        return {
            graphData: {x:[], y:[]},
            currentPrice:-1,
            coin:coin
        }
    }
    const currentPrice = calculatePriceFromPoint(prices[prices.length - 1]);
    const priceGraphData = prices.reduce((accum, value) => {
        accum.x.push(calculatePriceFromPoint(value));
        accum.y.push(value.time);
        return accum;
    }, {x: [], y: []});

    return {
        graphData: priceGraphData,
        currentPrice: currentPrice,
        coin: coin
    }
}

function calculatePriceFromPoint(pricePoint) {
    return (pricePoint.high + pricePoint.low) / 2;
}