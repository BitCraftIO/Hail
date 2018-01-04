// @flow
import { storeListItem , getList } from "../../../localstorage/SimpleStorage";

const KEY_COIN_LIST = "WatchlistStorage.CoinList";

export function storeCoin(coinSymbol: String) : Promise<boolean> {
    return storeListItem(KEY_COIN_LIST, coinSymbol);
}

export function allWatchlistCoins() : Promise<Array<string>> {
    return getList(KEY_COIN_LIST);
}