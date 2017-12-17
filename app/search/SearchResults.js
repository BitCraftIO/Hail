import React from 'react';
import {View, Text, Platform, FlatList} from 'react-native';
import search from "./SearchResultRequestAdapter";
import SearchItem from "./SearchItem"
import Search from "./SearchBar";

export default class SearchResults extends React.Component {

    constructor() {
        super();
        this.state = {
            hasItems: false,
            searchResult: null
        }
    }

    static navigationOptions = {
        header: () => {}
    };

    performSearch = async (term) => {
        const searchResult = await search(term);
        this.setState({searchResult: searchResult, hasItems: searchResult.length > 0});
    }

    async componentDidMount() {
        await this.performSearch(this.props.navigation.state.params.query);
    }

    noResultView = () => {
        return (
            <Text>No items</Text>
        );
    }

    resultView = () => {
        return (
            <FlatList
                data={this.state.searchResult}
                renderItem={(item) => <SearchItem item={item.item}/>}
                keyExtractor={(item,index) => item.id}
            />
        );
    }

    root = (children) => {
        return (
            <View style={{paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight}}>
                <Search onSearchSubmit={this.performSearch}/>
                {children}
            </View>
        )
    }

    render() {
        let children;
        if (this.state.hasItems) {
            children = this.resultView();
        } else {
            children = this.noResultView();
        }

        return this.root(children);
    }
}