import { StackNavigator } from 'react-navigation';
import Home from "./ui/screens/home/Home";
import SearchResults from './ui/screens/search/state/SearchContainer';
import WalletsList from "./ui/screens/wallets/walletslist/WalletsListContainer";
import Watchlist from "./ui/screens/watchlist/state/WatchlistContainer";
import CoinDetail from "./ui/screens/coindetail/CoinDetailContainer";
import WalletDetailsPage from "./ui/screens/wallets/WalletDetailsPage";
import MakeOrReceiveTransactionInputAmountPage from "./ui/screens/wallets/MakeOrReceiveTransactionFlow/MakeOrReceiveTransactionInputAmountPage";
import NewWalletPage from "./ui/screens/wallets/newwalletflow/NewWalletPage"

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
        screen: WalletsList,
    },

    CoinDetail: {
        screen:CoinDetail
    },

    WalletDetailsPage: {
    	screen: WalletDetailsPage
    },

    // MakeOrReceiveTransactionPage: {
    // 	screen: MakeOrReceiveTransactionPage
    // },

    MakeOrReceiveTransactionInputAmountPage: {
        screen: MakeOrReceiveTransactionInputAmountPage
    },
    
    NewWalletPage: {
        screen: NewWalletPage
    }
});

export default Navigator;