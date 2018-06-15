import { StackNavigator } from 'react-navigation';
import Home from './ui/screens/Home';
import WalletDashboard from "./ui/screens/wallets/dashboard/WalletDashboard";
import WalletDetailsPage from './ui/screens/wallets/WalletDetailsPage';
import WalletPager from './ui/screens/wallets/dashboard/WalletPager';
import TransactionPage from './ui/screens/wallets/transactionflow/TransactionPage';
import NewWalletPage from './ui/screens/wallets/newwalletflow/NewWalletPage';
import CoinbaseSuccessPage from './ui/screens/wallets/newwalletflow/coinbasesuccesspage/CoinbaseSuccessPageContainer';
import LogPage from './ui/screens/logger/LogPage';

// https://reactnavigation.org/docs/intro/basic-app
const Navigator = StackNavigator({
    Home: {
        screen: Home
    },

    WalletsList: {
        screen: WalletDashboard
    },

    WalletDetailsPage: {
        screen: WalletDetailsPage
    },

    WalletPager: {
        screen: WalletPager
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
