import {resourceActionCreator} from "../../../../reduxhelpers/CreateResource";
import getWatchlistCoinData from "../WatchlistCoinDataRequestMapper";
import { allWatchlistCoins } from "../WatchlistStorage";

export const RESOURCE_GET_COIN_DATA = "Resource.Watchlist.GetCoinData";
export const RESOURCE_GET_COIN_DATA_TAG = "coinData";

export default WatchListActions = (dispatch) => {
    const creator = resourceActionCreator(dispatch);
    const getCoinData = creator(RESOURCE_GET_COIN_DATA, RESOURCE_GET_COIN_DATA_TAG, async () => {
            const coins = await allWatchlistCoins();
            const coinDataPromises = coins.map(coin => getWatchlistCoinData(coin));
            return Promise.all(coinDataPromises);
    });

    return {
        getWatchlistCoins: getCoinData
    }
}
