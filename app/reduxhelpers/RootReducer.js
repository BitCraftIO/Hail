import { combineReducers } from 'redux';
import { CoinbaseSuccessPageReducer, PAGE as CoinbaseSuccessPage } from "../ui/screens/wallets/coinbase/CoinbaseSuccessPageState";

export default combineReducers({
    [CoinbaseSuccessPage]: CoinbaseSuccessPageReducer,
});