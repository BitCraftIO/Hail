import generateReducer from "./../../reduxhelpers/CreateReducer";
import {RECEIVED_REQUEST_ERROR, RECEIVE_SEARCH_RESULTS, REQUEST_PERFORM_SEARCH} from "./SearchActions";

const initialState = {
    loading: false,
    searchResult: null,
    hasItems: false,
    error: null
}

export default generateReducer(initialState, {
    "SearchAction.RequestSearch": (state, action) => {
        return Object.assign({}, state, {
            ...state,
            loading: true
        });
    },

    "SearchAction.ReceiveSearchResults": (state, action) => {
        return Object.assign({}, state, {
            ...state,
            loading: false,
            searchResult: action.searchResults,
            hasItems: action.searchResults.length > 0

        });

    },

    "SearchAction.ReceivedRequestError": (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error
        }
    }
});
