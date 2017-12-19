import React from 'react';
import {StyleSheet, Text, View, TextInput, Button, Platform, NativeModules, StatusBar, Keyboard} from 'react-native';
import {getCoinDetails} from '../../../network/CoinMarketCapApi';
import Search from "../search/SearchBar";
import CoinLineChart from "./../../CoinLineChart";
import {getBitcoinData} from "../../../network/HistoricalDataApi";

// this is NOT the real watchlist view. Just a placeholder till it actually gets here.
export default class WatchList extends React.Component {

    static navigationOptions = {
        header: () => {
        }
    };

    constructor() {
        super();
        this.state = {
            "coin": null,
            "coinText": "No con selected",
            "coinData": null
        };
    }

    componentDidMount() {
        getBitcoinData().then((data) => {
            const graphData = {x: [], y: []};
            Object.keys(data.bpi).map(function (key, index) {
                graphData["x"].push(data.bpi[key]);
                graphData["y"].push(key);
            });

            this.setState({
                coinData: graphData
            });
        });
    }

    lookupCoin = () => {
        getCoinDetails(this.state.input).then((coin) => {
            coin = coin[0];
            this.setState({
                "coin": coin,
                "coinText": `you selected: ${coin.symbol}`

            });
        }).catch((e) => {
            this.setState({
                "coinText": `'${this.state.input}' is not a valid coin.`
            })
        });
    }

    onSearchSubmit = (query) => {
        const {navigate} = this.props.navigation;
        Keyboard.dismiss();
        navigate("SearchResults", {query: query});
    }

    goToWallets = (query) => {
        const {navigate} = this.
        props.navigation;
        navigate("WalletsList");
    }

    render() {
        const tickStyle = {
            axis: {
                stroke: 'black',
                strokeOpacity: 0
            },
            ticks: {
                size: 2,
                stroke: 'black',
                strokeOpacity: 0.1
            },
            grid: {
                stroke: 'rgba(0, 0, 0, 0.1)',
                strokeWidth: 1,
                strokeDasharray: '6, 6',
            },
            tickLabels: {
                fontSize: '9px',
                fontFamily: 'inherit',
                fillOpacity: 1,
                margin: 0,
                padding: 0
            },
            axisLabel: {
                fontsize: 13
            }
        };

        return (
            <View style={styles.container}>
                <Search onSearchSubmit={this.onSearchSubmit}/>
                <TextInput style={{width: 100}} onChangeText={(text) => this.setState({"input": text})}/>
                <Button title="press me" onPress={this.lookupCoin}/>
                <Button title="Wallets" onPress={this.goToWallets} />
                <Text>{this.state.coinText}</Text>

                {this.state.coinData != null
                    ? (
                            <CoinLineChart
                                dates={this.state.coinData.y}
                                values={this.state.coinData.x}
                                />
                    )
                    : (<Text/>)}
            </View>
        );
    }
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
});
