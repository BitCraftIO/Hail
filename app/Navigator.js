import { StackNavigator } from 'react-navigation';
import Home from './ui/screens/Home';
import CreateWallet from "./ui/screens/wallets/createwallet/CreateWallet";
import WalletDashboard from "./ui/screens/wallets/dashboard/WalletDashboard";
import WalletDetailsPage from './ui/screens/wallets/WalletDetailsPage';
import TransactionPage from './ui/screens/wallets/transactionflow/TransactionPage';
import NewWalletPage from './ui/screens/wallets/newwalletflow/NewWalletPage';
import CoinbaseSuccessPage from './ui/screens/wallets/newwalletflow/coinbasesuccesspage/CoinbaseSuccessPageContainer';

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

    TransactionPage: {
        screen: TransactionPage
    },

    NewWalletPage: {
        screen: CreateWallet,
    },

    CoinbaseSuccessPage: {
        screen: CoinbaseSuccessPage,
        path: 'wallet/oauth/coinbase/'
    }
}, {
    headerMode: "none"
});

export default Navigator;
