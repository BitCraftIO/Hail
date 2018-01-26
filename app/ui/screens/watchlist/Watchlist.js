import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements'
import PropTypes from 'prop-types';
import {ResourceComponent} from "../../../reduxhelpers/CreateResource";

import {RESOURCE_GET_COIN_DATA_TAG} from "./state/WatchlistActions";
import WatchlistItem from "./WatchlistItem";

export default class Watchlist extends React.Component {
    static navigationOptions = {
        header: () => {
        }
    };

    static propTypes = {
        [RESOURCE_GET_COIN_DATA_TAG]: PropTypes.object.isRequired,
        navigate: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.getWatchlistCoins();
    }

    onWatchlistItemClick = (item) => {
        this.props.navigation.navigate("CoinDetail", {coin: item.coin});
    }

    showCoins = (coinData) => {
        if (coinData.length > 0) {
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
        } else {
            return (
                <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                    <Text style={{fontSize: 16, color: "#777", marginTop: 16, textAlign:"center", lineHeight: 26}}>You aren't watching any coins!{"\n"}Let's fix that.</Text>
                    <Button
                        onPress={() => this.props.navigate("SearchResults")}
                        borderRadius={4}
                        title={"Search for coins"}
                        color={"#fff"}
                        backgroundColor={"#50d8b7"}
                        containerViewStyle={{marginTop: 12}}/>
                </View>
            )
        }
    }

    render() {
        return (
            <ResourceComponent
                resource={this.props.coinData}
                progressView={() => (<Text>Loading</Text>)}
                errorView={() => (<Text>Error</Text>)}
                dataView={this.showCoins}/>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 24,
        marginRight: 24
    }
});