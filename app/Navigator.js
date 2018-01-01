import { StackNavigator } from 'react-navigation';
import SearchResults from './ui/screens/search/state/SearchContainer';
import Testbed from "./ui/screens/Testbed";
import WalletsList from "./ui/screens/wallets/WalletsList";
import Watchlist from "./ui/screens/watchlist/state/WatchlistContainer";
import CoinDetail from "./ui/screens/coindetail/CoinDetailContainer";
import WalletDetailsPage from "./ui/screens/wallets/WalletDetailsPage";
import MakeOrReceiveTransactionPage from "./ui/screens/wallets/MakeOrReceiveTransactionFlow/MakeOrReceiveTransactionPage";
import MakeOrReceiveTransactionInputAmountPage from "./ui/screens/wallets/MakeOrReceiveTransactionFlow/MakeOrReceiveTransactionInputAmountPage"

// https://reactnavigation.org/docs/intro/basic-app
const Navigator = StackNavigator({
    Testbed: {
        screen: Testbed
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
        screen:CoinDetail
    },

    WalletDetailsPage: {
    	screen: WalletDetailsPage
    },
    MakeOrReceiveTransactionPage: {
    	screen: MakeOrReceiveTransactionPage
    },
    MakeOrReceiveTransactionInputAmountPage: {
        screen: MakeOrReceiveTransactionInputAmountPage
    }
});

export default Navigator;