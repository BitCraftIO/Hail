import React from 'react';
import {View, Text, Platform, FlatList} from 'react-native';
import SearchItem from "./SearchItem";
import SearchActions from "./SearchActions";
import SearchBar from "./SearchBar";

export default class SearchResults extends React.Component {

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
        return (
            <FlatList
                data={this.props.searchResult}
                renderItem={(item) => <SearchItem item={item.item}/>}
                keyExtractor={(item, index) => item.id}
            />
        );
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