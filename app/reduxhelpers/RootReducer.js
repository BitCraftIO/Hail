import { combineReducers } from 'redux';
import SearchReducer from "../ui/screens/search/state/SearchReducer";
import WatchlistReducer from "../ui/screens/watchlist/state/WatchlistReducer";

export default combineReducers({
    search: SearchReducer,
    watchlist: WatchlistReducer
});