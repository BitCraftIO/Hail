import {View, Text, FlatList} from 'react-native';
import SearchItem from "./SearchItem";
import SearchActions from "./state/SearchActions";
import SearchBar from "./SearchBar";
import * as React from "react";
import PropTypes from 'prop-types';


export default class SearchResults extends React.Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        navigation: PropTypes.object.isRequired,

        search: PropTypes.object.isRequired,
        watchlistCoins: PropTypes.object.isRequired,
        addWatchList: PropTypes.object.isRequired
    }

    static navigationOptions = {
        header: () => { }
    };

    constructor() {
        super();
        this.state = {
            watchlistCoins: []
        }
    }

    componentDidMount() {
        this.setState({
            actions: SearchActions(this.props.dispatch)
        }, () => {
            this.state.actions.performSearch(this.props.navigation.state.params.query);
            this.state.actions.getWatchlistCoins();
        });

    }

    noResultView = () => {
        return (
            <Text>No items</Text>
        );
    }

    onAddWatchListClick = (symbol) => {
        this.state.actions.addToWatchlist(symbol);
    }

    resultView = () => {
        return (
            <FlatList
                data={this.props.search.result}
                renderItem={(item) => <SearchItem
                isInWatchlist={this.props.watchlistCoins.result.includes(item.item.symbol)}
                addToWatchlist={this.onAddWatchListClick}
                coin={item.item} />}
                keyExtractor={(item, index) => item.id}
            />
        )
    }

    loadingview = () => {
        return (
            <Text> Loading </Text>
        )
    }

    errorView = () => {
        return (
            <Text> Error </Text>
        )
    }

    performSearch = (term) => {
        this.state.actions.performSearch(term);
    }

    root = (children) => {
        return (
            <View>
                <SearchBar onSearchSubmit={this.performSearch}/>
                {children}
            </View>
        )
    }

    compose = (...items) => {
        return (
            [...Array(10)].map((x, i) => items[i])
        )
    }

    addedWatchlistView = () => {
        return (
            <Text>Added to your watchlist!</Text>
        )
    }

    render() {
        let children;
        if (!this.state.hasOwnProperty("actions")) {
            children = this.noResultView();
            return this.root(children);
        }

        if (this.props.search.loading) {
            children = this.loadingview();
        } else if (this.props.search.result.length > 0) {
            if (this.props.addWatchList.result) {
                children = this.compose(this.resultView(), this.addedWatchlistView());
            } else {
                children = this.resultView();
            }
        } else if (this.props.search.error) {
            children = this.errorView();
        } else {
            children = this.noResultView();
        }

        return this.root(children);
    }
}