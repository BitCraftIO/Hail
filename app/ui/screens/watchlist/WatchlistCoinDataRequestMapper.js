// @flow
import { pricesByTheMinute } from "../../../network/HistoricalPricesApi";

export default async function getWatchlistCoinData(coin: string): Promise<Object> {
    const now = Math.floor(Date.now() / 1000);
    const prices = await pricesByTheMinute(now - 86400, coin); // 86400 seconds = 24 hours
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