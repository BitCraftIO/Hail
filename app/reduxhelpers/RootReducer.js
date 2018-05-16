import { combineReducers } from 'redux';
import SearchReducer from "../ui/screens/search/state/SearchReducer";
import WatchlistReducer from "../ui/screens/watchlist/state/WatchlistReducer";
import { CoinDetailReducer, PAGE as CoinDetailPage } from "../ui/screens/coindetail/CoinDetailState";
import { CoinbaseSuccessPageReducer, PAGE as CoinbaseSuccessPage } from "../ui/screens/wallets/newwalletflow/coinbasesuccesspage/CoinbaseSuccessPageState";

export default combineReducers({
    search: SearchReducer,
    watchlist: WatchlistReducer,
    [CoinDetailPage]: CoinDetailReducer,
    [CoinbaseSuccessPage]: CoinbaseSuccessPageReducer,
});