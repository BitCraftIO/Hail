import { combineReducers } from 'redux';
import { WalletsListReducer, PAGE as WalletsListPage } from "../ui/screens/wallets/walletslist/WalletsListState";
import { CoinbaseSuccessPageReducer, PAGE as CoinbaseSuccessPage } from "../ui/screens/wallets/newwalletflow/coinbasesuccesspage/CoinbaseSuccessPageState";

export default combineReducers({
    [WalletsListPage]: WalletsListReducer,
    [CoinbaseSuccessPage]: CoinbaseSuccessPageReducer,
});