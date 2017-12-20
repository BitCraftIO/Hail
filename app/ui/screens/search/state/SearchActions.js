// @flow
import {generateSyncAction, generateAsyncAction} from '../../../../reduxhelpers/GenerateAction';
import search from "../SearchResultRequestAdapter";
import { resourceActionCreator } from "../../../../reduxhelpers/CreateResource";
import { storeCoin } from "../../watchlist/WatchlistStorage";
import { createGetWatchlistCoinsResourceAction } from "../../../../shared/GetWatchlistCoinsResource";

export const RESOURCE_SEARCH_RESULT = "Resource.SearchResult.SearchResult";
export const RESOURCE_SEARCH_RESULT_TAG = "search"
export const RESOURCE_ADD_TO_WATCHLIST = "Resource.SearchResult.AddToWatchlist";
export const RESOURCE_ADD_TO_WATCHLIST_TAG = "addWatchList";

export default function SearchActions (dispatch: Function) {
    const creator = resourceActionCreator(dispatch);

    const addToWatchlistResource = creator(RESOURCE_ADD_TO_WATCHLIST, RESOURCE_ADD_TO_WATCHLIST_TAG, storeCoin);
    const performSearch = creator(RESOURCE_SEARCH_RESULT, RESOURCE_SEARCH_RESULT_TAG, search);
    const { getWatchlistCoins } = createGetWatchlistCoinsResourceAction(dispatch);

    return {
        performSearch: performSearch,
        addToWatchlist: addToWatchlistResource,
        getWatchlistCoins: getWatchlistCoins
    }
}