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

    constructor(props) {
        super(props)
        let query = ""
        const {state} = this.props.navigation
        if (state && state.params && state.params.query) {
            query = state.params.query;
        }

        this.state = {
            query:query
        }
    }

    componentDidMount() {
        console.log(this.props.navigation.state)
        const {state} = this.props.navigation
        if (state && state.params && state.params.query) {
            this.props.performSearch(state.params.query);
        }
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
                                            isInWatchlist={this.props.watchlistCoins.result && this.props.watchlistCoins.result.includes(item.item.symbol)}
                                            addToWatchlist={this.onAddWatchListClick}
                                            coin={item.item} />
                }
                keyExtractor={(item, index) => item.rank}
            />
        )
    }

    loadingview = () => {
        return (
            <Text> Loading </Text>
        )
    }

    errorView = (err) => {
        return (
            <Text> {err.message} </Text>
        )
    }

    root = (children) => {
        return (
            <View>
                <SearchBar defaultText={this.state.query} onSearchSubmit={this.props.performSearch}/>
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
        } else if (this.props.search.result !== null) {
            if (this.props.addWatchList.result) {
                children = this.compose(this.resultView(), this.addedWatchlistView());
            } else {
                children = this.resultView();
            }
        } else if (this.props.search.error) {
            children = this.errorView(this.props.search.error);
        } else {
            children = this.noResultView();
        }

        return this.root(children);
    }
}