import { combineReducers } from 'redux';
import SearchReducer from "../ui/screens/search/state/SearchReducer";
import WatchlistReducer from "../ui/screens/watchlist/state/WatchlistReducer";
import { CoinDetailReducer, PAGE as CoinDetailPage } from "../ui/screens/coindetail/CoinDetailState";

export default combineReducers({
    search: SearchReducer,
    watchlist: WatchlistReducer,
    [CoinDetailPage]: CoinDetailReducer
});