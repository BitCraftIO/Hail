import {createResourceAction, createResourceReducerStates, resourceInitialState, mapResourceToProps} from "../reduxhelpers/CreateResource";
import { allWatchlistCoins } from "../ui/screens/watchlist/WatchlistStorage";

const RESOURCE_GET_WATCHLIST_COINS = "Resource.Shared.GetWatchlistCoins";
export const RESOURCE_GET_WATCHLIST_COINS_TAG = "watchlistCoins";

export const createGetWatchlistCoinsResourceAction = (dispatch) => {
    return {
        getWatchlistCoins: createResourceAction(dispatch, RESOURCE_GET_WATCHLIST_COINS, RESOURCE_GET_WATCHLIST_COINS_TAG, allWatchlistCoins)
    }
}

export const createGetWatchlistCoinsResourceReducer = () => {
    return createResourceReducerStates(RESOURCE_GET_WATCHLIST_COINS, RESOURCE_GET_WATCHLIST_COINS_TAG);
}

export const GetWatchlistCoinsInitialState = resourceInitialState(RESOURCE_GET_WATCHLIST_COINS_TAG);

export const GetWatchlistCoinsResourceMapper = (page, state) => mapResourceToProps(page, state)(RESOURCE_GET_WATCHLIST_COINS_TAG);