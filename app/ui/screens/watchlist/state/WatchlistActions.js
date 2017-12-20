import { generateSyncAction, generateAsyncAction } from '../../../../reduxhelpers/GenerateAction';

const REQUEST_ADD_TO_WATCHLIST = "WatchlistAction.RequestAddToWatchlist";
const ADDED_TO_WATCHLIST = "WatchlistAction.AddedToWatchlist";

export default WatchListActions = (dispatch) => {
    const syncGenerator = generateSyncAction(dispatch);
    const asyncGenerator = generateAsyncAction(dispatch);

    const requestAddToWatchlistAction = syncGenerator(REQUEST_ADD_TO_WATCHLIST, "symbol");
    const addedToWatchlist = syncGenerator(ADDED_TO_WATCHLIST);

    const requestAddToWatchlist = (query) => {

    }

    return {
        addToWatchlist: requestAddToWatchlist
    }
}
