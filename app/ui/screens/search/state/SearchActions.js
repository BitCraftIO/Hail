// @flow
import {generateSyncAction, generateAsyncAction} from '../../../../reduxhelpers/GenerateAction';
import search from "../SearchResultRequestAdapter";
import { resourceActionCreator } from "../../../../reduxhelpers/CreateResource";
import { storeCoin, allWatchlistCoins } from "../../watchlist/WatchlistStorage";

export const RESOURCE_SEARCH_RESULT = "Resource.SearchResult.SearchResult";
export const RESOURCE_SEARCH_RESULT_TAG = "search"
export const RESOURCE_ADD_TO_WATCHLIST = "Resource.SearchResult.AddToWatchlist";
export const RESOURCE_ADD_TO_WATCHLIST_TAG = "addWatchList";
export const RESOURCE_GET_WATCHLIST_COINS = "Resource.SearchResult.GetWatchlistCoins";
export const RESOURCE_GET_WATCHLIST_COINS_TAG = "watchlistCoins";

export default function SearchActions (dispatch: Function) {
    const creator = resourceActionCreator(dispatch);

    const addToWatchlistResource = creator(RESOURCE_ADD_TO_WATCHLIST, RESOURCE_ADD_TO_WATCHLIST_TAG, storeCoin);
    const performSearch = creator(RESOURCE_SEARCH_RESULT, RESOURCE_SEARCH_RESULT_TAG, search);
    const getWatchlistCoins = creator(RESOURCE_GET_WATCHLIST_COINS, RESOURCE_GET_WATCHLIST_COINS_TAG, allWatchlistCoins);

    return {
        performSearch: performSearch,
        addToWatchlist: addToWatchlistResource,
        getWatchlistCoins: getWatchlistCoins
    }
}