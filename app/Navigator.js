import { StackNavigator } from 'react-navigation';
import App  from './App';
import SearchResults from './search/SearchResults';
import WatchList from "./watchlist/WatchList";

const Navigator = StackNavigator({
    Search: {
        screen: WatchList
    },
    SearchResults: {
        screen: SearchResults
    }
});

export default Navigator;