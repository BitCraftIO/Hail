import {View, Text, Platform, FlatList} from 'react-native';
import SearchItem from "./SearchItem";
import SearchActions from "./state/SearchActions";
import SearchBar from "./SearchBar";
import * as React from "react";
import PropTypes from 'prop-types';


export default class SearchResults extends React.Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        navigation: PropTypes.object.isRequired,
        loading: PropTypes.bool.isRequired,
        hasItems: PropTypes.bool.isRequired,
        searchResults: PropTypes.array.isRequired,
        error: PropTypes.object.isRequired
    }

    static navigationOptions = {
        header: () => { }
    };

    componentDidMount() {
        this.actions = SearchActions(this.props.dispatch);
        this.actions.performSearch(this.props.navigation.state.params.query);
    }

    noResultView = () => {
        return (
            <Text>No items</Text>
        );
    }

    resultView = () => {
        return <FlatList
                data={this.props.searchResult}
                renderItem={(item) => <SearchItem item={item.item}/>}
                keyExtractor={(item, index) => item.id}
            />
        ;
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
        this.actions.performSearch(term);
    }

    root = (children) => {
        return (
            <View style={{paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight}}>
                <SearchBar defaultText={this.props.navigation.state.params.query} onSearchSubmit={this.performSearch}/>
                {children}
            </View>
        )
    }

    render() {
        let children;
        if (this.props.loading) {
            children = this.loadingview();
        } else if (this.props.hasItems) {
            children = this.resultView();
        } else if (this.props.error) {
            children = this.errorView();
        } else {
            children = this.noResultView();
        }

        return this.root(children);
    }
}