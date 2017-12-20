import generateReducer from "../../../../reduxhelpers/CreateReducer";
import { createResourceReducerStates, resourceInitialState } from "../../../../reduxhelpers/CreateResource";
import { createGetWatchlistCoinsResourceReducer, GetWatchlistCoinsInitialState } from "../../../../shared/GetWatchlistCoinsResource";
import { RESOURCE_ADD_TO_WATCHLIST, RESOURCE_ADD_TO_WATCHLIST_TAG, RESOURCE_SEARCH_RESULT, RESOURCE_SEARCH_RESULT_TAG } from "./SearchActions";

const initialState = {
    ...resourceInitialState(RESOURCE_SEARCH_RESULT_TAG),
    ...GetWatchlistCoinsInitialState,
    [RESOURCE_ADD_TO_WATCHLIST_TAG]: {
        loading:false,
        error:null,
        result:false
    }
}

const searchResourceStates = createResourceReducerStates(RESOURCE_SEARCH_RESULT, RESOURCE_SEARCH_RESULT_TAG);
const addToWatchlistStates = createResourceReducerStates(RESOURCE_ADD_TO_WATCHLIST, RESOURCE_ADD_TO_WATCHLIST_TAG);
const getWatchlistCoinsStates = createGetWatchlistCoinsResourceReducer();


export default generateReducer(initialState, {
    ...searchResourceStates,
    ...addToWatchlistStates,
    ...getWatchlistCoinsStates
});
