import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import { ResourceComponent } from "../../../reduxhelpers/CreateResource";

import {RESOURCE_GET_COIN_DATA_TAG} from "./state/WatchlistActions";
import WatchlistItem from "./WatchlistItem";

export default class Watchlist extends React.Component {
    static navigationOptions = {
        header: () => { }
    };

    static propTypes = {
        [RESOURCE_GET_COIN_DATA_TAG]: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.getWatchlistCoins();
    }

    onWatchlistItemClick = (item) => {
        this.props.navigation.navigate("CoinDetail", {coin: item.coin});
    }

    showCoins = (coinData) => {
        return (
            <View style={styles.container}>
                <Text>Favorites</Text>
                <FlatList
                    data={coinData}
                    renderItem={item => <WatchlistItem item={item.item} onClick={this.onWatchlistItemClick}/>}
                    keyExtractor={(item, index) => item.coin + item.currentPrice + index}
                />
            </View>
        );
    }

    render() {
        return (
            <ResourceComponent
                resource={this.props.coinData}
                progressView={() => (<Text>Loading</Text>)}
                errorView={() => (<Text>Error</Text>)}
                dataView={this.showCoins} />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft:24,
        marginRight:24
    }
});