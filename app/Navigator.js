import { StackNavigator } from 'react-navigation';
import Home from './ui/screens/Home';
import CreateWallet from "./ui/screens/wallets/createwallet/CreateWallet";
import WalletDashboard from "./ui/screens/wallets/dashboard/WalletDashboard";
import WalletDetailsPage from './ui/screens/wallets/WalletDetailsPage';
import WalletPager from './ui/screens/wallets/dashboard/WalletPager';
import TransactionPage from './ui/screens/wallets/transactionflow/TransactionPage';
import NewWalletPage from './ui/screens/wallets/newwalletflow/NewWalletPage';
import CoinbaseSuccessPage from './ui/screens/wallets/newwalletflow/coinbasesuccesspage/CoinbaseSuccessPageContainer';
import LogPage from './ui/screens/logger/LogPage';
import SettingsPage from './ui/screens/settings/SettingsPage';
import ModifySettingsScreen from './ui/screens/settings/ModifySettingsScreen';

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
        screen: CreateWallet,
    },

    CoinbaseSuccessPage: {
        screen: CoinbaseSuccessPage,
        path: 'wallet/oauth/coinbase/'
    },

    LogPage: {
        screen: LogPage
    },

    SettingsPage: {
        screen: SettingsPage
    },

    ModifySettingsScreen: {
        screen: ModifySettingsScreen
    }
}, {
    headerMode: "none"
});

export default Navigator;
