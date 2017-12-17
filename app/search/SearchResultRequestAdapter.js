import { getAllCoins } from "./../CoinMarketCapApi";

export default async function search(term) {
    term = term.toLowerCase();
    const coins = await getAllCoins();
    return coins
        .filter(coin => coin.name.toLowerCase().includes(term) || coin.symbol.toLowerCase().includes(term))
}