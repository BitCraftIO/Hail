// @flow

import React from 'react';
import ReactNative from 'react-native'
const {View, Text, FlatList, StyleSheet} = ReactNative
import {ResourceComponent} from "../../../reduxhelpers/CreateResource";
import {Colors} from "../Colors";

import type {WatchlistCoinData} from "./WatchlistCoinDataRequestMapper";
import WatchlistItem from "./WatchlistItem";
import Touchable from 'react-native-platform-touchable';

type Props = {
    coinData: WatchlistCoinData,
    navigate: void => void
}

export default class Watchlist extends React.Component<Props> {
    static navigationOptions = {
        header: () => {
        }
    };

    componentDidMount() {
        this.props.getWatchlistCoins();
    }

    onWatchlistItemClick = (item) => {
        this.props.navigation.navigate("CoinDetail", {coin: item.coin});
    }

    showData = data => {
        return (
            <FlatList
                ListHeaderComponent={
                    <Text style={styles.header}>WATCHING</Text>
                }
                ListEmptyComponent={
                    <Touchable
                        style={styles.emptyListContainer}
                        onPress={() => this.props.navigate("SearchResults")}>
                        <Text style={styles.emptyListText}>You aren't watching an coins{"\n\n"}Tap here to search for coins to start watching</Text>
                    </Touchable>
                }
                data={data}
                renderItem={item =>
                    <WatchlistItem
                        item={item.item}
                        onClick={this.onWatchlistItemClick}/>
                }
                keyExtractor={(item, index) => item.coin + item.currentPrice + index}
            />
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <ResourceComponent
                    resource={this.props.coinData}
                    progressView={() => (<Text>Loading</Text>)}
                    errorView={() => (<Text>Error</Text>)}
                    dataView={this.showData}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: Colors.PrimaryBackground,
        paddingLeft: 30,
        paddingRight: 24,
        paddingTop:32
    },

    emptyListContainer: {
      paddingTop:24,
      paddingBottom:24,
    },

    emptyListText: {
        color: Colors.PrimaryBackgroundText,
        width: 225
    },

    header: {
        fontSize:12,
        color: Colors.PrimaryBackgroundText,
    }
});