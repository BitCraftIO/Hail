import { StackNavigator } from 'react-navigation';
import SearchResults from './ui/screens/search/state/SearchContainer';
import WatchList from "./ui/screens/watchlist/WatchList";
import WalletsList from "./ui/screens/wallets/WalletsList";

// https://reactnavigation.org/docs/intro/basic-app
const Navigator = StackNavigator({
    Search: {
        screen: WatchList
    },
    SearchResults: {
        screen: SearchResults
    },
    WalletsList: {
    	screen: WalletsList
    }
});

export default Navigator;