import {View, Text, FlatList} from 'react-native';
import SearchItem from "./SearchItem";
import SearchBar from "./SearchBar";
import * as React from "react";
import PropTypes from 'prop-types';


export default class SearchResults extends React.Component {

    static propTypes = {
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
        this.props.performSearch(this.props.navigation.state.params.query);
        this.props.getWatchlistCoins();
    }

    noResultView = () => {
        return (
            <Text>No items</Text>
        );
    }

    onAddWatchListClick = (symbol) => {
        this.props.addToWatchlist(symbol);
    }

    resultView = () => {
        return (
            <FlatList
                data={this.props.search.result}
                renderItem={(item) => <SearchItem
                isInWatchlist={this.props.watchlistCoins.result.includes(item.item.symbol)}
                addToWatchlist={this.onAddWatchListClick}
                coin={item.item} />}
                keyExtractor={(item, index) => item.rank}
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

    root = (children) => {
        return (
            <View>
                <SearchBar onSearchSubmit={this.props.performSearch}/>
                {children}
            </View>
        )
    }

    compose = (...items) => {
        return (
            [...Array(items.length)].map((x, i) => items[i])
        )
    }

    addedWatchlistView = () => {
        return (
            <Text>Added to your watchlist!</Text>
        )
    }

    render() {
        let children;
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