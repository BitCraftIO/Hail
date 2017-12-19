import { StackNavigator } from 'react-navigation';
import SearchResults from './ui/screens/search/state/SearchContainer';
import WatchList from "./ui/screens/watchlist/WatchList";

// https://reactnavigation.org/docs/intro/basic-app
const Navigator = StackNavigator({
    Search: {
        screen: WatchList
    },
    SearchResults: {
        screen: SearchResults
    }
});

export default Navigator;