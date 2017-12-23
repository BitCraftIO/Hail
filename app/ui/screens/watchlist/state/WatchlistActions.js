import {resourceActionCreator} from "../../../../reduxhelpers/CreateResource";
import { createGetWatchlistCoinsResourceAction } from "../../../../shared/GetWatchlistCoinsResource";
import getWatchlistCoinData from "../WatchlistCoinDataRequestMapper";
import { allWatchlistCoins } from "../WatchlistStorage";

export const RESOURCE_GET_COIN_DATA = "Resource.Watchlist.GetCoinData";
export const RESOURCE_GET_COIN_DATA_TAG = "coinData";

export default WatchListActions = (dispatch) => {
    const { getWatchlistCoins } = createGetWatchlistCoinsResourceAction(dispatch);

    const creator = resourceActionCreator(dispatch);
    const getCoinData = creator(RESOURCE_GET_COIN_DATA, RESOURCE_GET_COIN_DATA_TAG, async () => {
            const coins = await allWatchlistCoins();
            return getWatchlistCoinData(coins[0]);
    });

    return {
        getWatchlistCoins: getCoinData
    }
}
