import { StackNavigator } from 'react-navigation';
import Home from './ui/screens/home/Home';
import SearchResults from './ui/screens/search/state/SearchContainer';
import WalletsList from './ui/screens/wallets/walletslist/WalletsListContainer';
import Watchlist from './ui/screens/watchlist/state/WatchlistContainer';
import CoinDetail from './ui/screens/coindetail/CoinDetailContainer';
import WalletDetailsPage from './ui/screens/wallets/WalletDetailsPage';
import TransactionPage from './ui/screens/wallets/transactionflow/TransactionPage';
import NewWalletPage from './ui/screens/wallets/newwalletflow/NewWalletPage';
import CoinbaseSuccessPage from './ui/screens/wallets/newwalletflow/coinbasesuccesspage/CoinbaseSuccessPageContainer';
import LogPage from './ui/screens/logger/LogPage';

// https://reactnavigation.org/docs/intro/basic-app
const Navigator = StackNavigator({
    Home: {
        screen: Home
    },

    Watchlist: {
        screen: Watchlist
    },

    SearchResults: {
        screen: SearchResults
    },

    WalletsList: {
        screen: WalletsList
    },

    CoinDetail: {
        screen: CoinDetail
    },

    WalletDetailsPage: {
        screen: WalletDetailsPage
    },

    TransactionPage: {
        screen: TransactionPage
    },

    NewWalletPage: {
        screen: NewWalletPage
    },

    CoinbaseSuccessPage: {
        screen: CoinbaseSuccessPage,
        path: 'wallet/oauth/coinbase/'
    },

    LogPage: {
        screen: LogPage
    }
});

export default Navigator;
