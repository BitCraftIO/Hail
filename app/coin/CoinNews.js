// @flow

import {repeat} from "../utils/Misc";
import {timeFromDateString, timeSinceString} from "../utils/TimeUtils";

const API_KEY = "088d2c8287f420a5632a6215e15c4921a6d10820";
const BASE_URL = `https://cryptopanic.com/api/posts/?auth_token=${API_KEY}&currency=`;
const DEFAULT_NEWS_ITEMS_COUNT = 4;

export type CoinNewsItem = {
    coin:string,
    headline:string,
    url:string,
    source:string,
    timeSincePublish:string
}

export async function getNewsItems(coinSymbol: string, itemCount: number = DEFAULT_NEWS_ITEMS_COUNT) : Promise<Array<CoinNewsItem>> {
    const response = await fetch(`${BASE_URL}${coinSymbol}`).then(response => response.json());
    const newsItems = [];
    repeat(itemCount, index => {
       const newsItem = response.results[index];
       newsItems.push({
               coin: coinSymbol,
               headline: newsItem.title,
               url: newsItem.url,
               source: newsItem.source.domain,
               timeSincePublish: timeSinceString(timeFromDateString(newsItem.created_at))
           })
    })();

    return newsItems;
}