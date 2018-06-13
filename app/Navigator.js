import { StackNavigator } from 'react-navigation';
import Home from './ui/screens/Home';
import WalletDashboard from "./ui/screens/wallets/dashboard/WalletDashboard";
import WalletDetailsPage from './ui/screens/wallets/WalletDetailsPage';
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
    },

    SettingsPage: {
        screen: SettingsPage
    },

    ModifySettingsScreen: {
        screen: ModifySettingsScreen
    }
});

export default Navigator;
