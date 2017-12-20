import generateReducer from "../../../../reduxhelpers/CreateReducer";
import {createResourceReducerStates, resourceInitialState} from "../../../../reduxhelpers/CreateResource";
import {
    RESOURCE_ADD_TO_WATCHLIST, RESOURCE_ADD_TO_WATCHLIST_TAG, RESOURCE_GET_WATCHLIST_COINS,
    RESOURCE_GET_WATCHLIST_COINS_TAG, RESOURCE_SEARCH_RESULT,
    RESOURCE_SEARCH_RESULT_TAG
} from "./SearchActions";

const initialState = {
    ...resourceInitialState(RESOURCE_SEARCH_RESULT_TAG),
    ...resourceInitialState(RESOURCE_GET_WATCHLIST_COINS_TAG),
    [RESOURCE_ADD_TO_WATCHLIST_TAG]: {
        loading:false,
        error:null,
        result:false
    }
}

const searchResourceStates = createResourceReducerStates(RESOURCE_SEARCH_RESULT, RESOURCE_SEARCH_RESULT_TAG);
const addToWatchlistStates = createResourceReducerStates(RESOURCE_ADD_TO_WATCHLIST, RESOURCE_ADD_TO_WATCHLIST_TAG);
const getWatchlistCoinsStates = createResourceReducerStates(RESOURCE_GET_WATCHLIST_COINS, RESOURCE_GET_WATCHLIST_COINS_TAG);


export default generateReducer(initialState, {
    ...searchResourceStates,
    ...addToWatchlistStates,
    ...getWatchlistCoinsStates
});
