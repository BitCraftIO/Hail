import { StackNavigator } from 'react-navigation';
import Home from './ui/screens/Home';
import WalletsList from './ui/screens/wallets/walletslist/WalletsListContainer';
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
        screen: WalletsList
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
    }
});

export default Navigator;
