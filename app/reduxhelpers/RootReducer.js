import { combineReducers } from 'redux';
import { CoinbaseSuccessPageReducer, PAGE as CoinbaseSuccessPage } from "../ui/screens/wallets/newwalletflow/coinbasesuccesspage/CoinbaseSuccessPageState";

export default combineReducers({
    [CoinbaseSuccessPage]: CoinbaseSuccessPageReducer,
});