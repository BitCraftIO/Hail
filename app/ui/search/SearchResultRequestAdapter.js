import { getAllCoins } from "../../network/CoinMarketCapApi";

export default async function search(term, successFunc, errorFunc) {
    term = term.toLowerCase();
    try {
        const allCoins = await getAllCoins();
        const filtered = allCoins.filter(coin =>
            coin.name.toLowerCase().includes(term) ||
            coin.symbol.toLowerCase().includes(term));

        successFunc(filtered);
    } catch (e) {
        errorFunc(e);
    }
}