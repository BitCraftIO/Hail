import generateReducer from "../../../../reduxhelpers/CreateReducer";
import { RECEIVE_SEARCH_RESULTS, RECEIVED_REQUEST_ERROR, REQUEST_PERFORM_SEARCH } from "./SearchActions";


const initialState = {
    loading: false,
    searchResult: null,
    hasItems: false,
    error: null
}

export default generateReducer(initialState, {
    [REQUEST_PERFORM_SEARCH]: (state, action) => {
        return {
            ...state,
            loading: true
        }
    },

    [RECEIVE_SEARCH_RESULTS]: (state, action) => {
        return {
            ...state,
            loading: false,
            searchResult: action.searchResults,
            hasItems: action.searchResults.length > 0
        }
    },

    [RECEIVED_REQUEST_ERROR]: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error
        }
    }
});
