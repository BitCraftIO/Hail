import { generateSyncAction, generateAsyncAction } from './../../reduxhelpers/GenerateAction';
import search from "./SearchResultRequestAdapter";

export const REQUEST_PERFORM_SEARCH = "SearchAction.RequestSearch";
export const RECEIVE_SEARCH_RESULTS = "SearchAction.ReceiveSearchResults";
export const RECEIVED_REQUEST_ERROR = "SearchAction.ReceivedRequestError";

export default SearchActions = (dispatch) => {
    const syncGenerator = generateSyncAction(dispatch);
    const requestPerformSearch = syncGenerator(REQUEST_PERFORM_SEARCH, "query");
    const receiveSearchResults = syncGenerator(RECEIVE_SEARCH_RESULTS, "searchResults");
    const receiveRequestError = syncGenerator(RECEIVED_REQUEST_ERROR, "error");

    let performSearchAction = async (query) => {
        requestPerformSearch(query);

        try {
            await search(query,
                (filtered) => {
                    receiveSearchResults(filtered);
                },
                (error) => {
                    receiveRequestError(error)
                });
        } catch (e) {
            receiveRequestError(e);
        }
    }

    const asyncGenerator = generateAsyncAction(dispatch);
    const performSearch = asyncGenerator(performSearchAction);

    return {
        performSearch: (query) => performSearch(query)
    }
}