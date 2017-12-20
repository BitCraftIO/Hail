// @flow

import {getAllCoins} from "../../../network/CoinMarketCapApi";

export default async function search(term: String): Promise<Array<Object>> {
    const lowerCaseTerm = term.toLowerCase();
    const allCoins = await getAllCoins();
    return allCoins.filter(coin =>
        coin.name.toLowerCase().includes(lowerCaseTerm) ||
        coin.symbol.toLowerCase().includes(lowerCaseTerm));
}