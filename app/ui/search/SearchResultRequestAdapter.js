// @flow

import { getAllCoins } from "../../network/CoinMarketCapApi";

export default async function search(term: String, successFunc: Function, errorFunc: Function) {
    const lowerCaseTerm = term.toLowerCase();
    try {
        const allCoins = await getAllCoins();
        const filtered = allCoins.filter(coin =>
            coin.name.toLowerCase().includes(lowerCaseTerm) ||
            coin.symbol.toLowerCase().includes(lowerCaseTerm));

        successFunc(filtered);
    } catch (e) {
        errorFunc(e);
    }
}