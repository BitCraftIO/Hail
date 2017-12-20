import { StackNavigator } from 'react-navigation';
import SearchResults from './ui/screens/search/state/SearchContainer';
import Testbed from "./ui/screens/Testbed";
import WalletsList from "./ui/screens/wallets/WalletsList";
import Watchlist from "./ui/screens/watchlist/Watchlist";
import WalletDetailsPage from "./ui/screens/wallets/WalletDetailsPage";

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
    WalletDetailsPage: {
    	screen: 
    }
});

export default Navigator;