import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Platform, StatusBar, Keyboard} from 'react-native';
import { getCoinDetails } from '../../network/CoinMarketCapApi';
import Search from "../search/SearchBar";
import { VictoryBar } from "victory-native";

// this is NOT the real watchlist view. Just a placeholder till it actually gets here.
export default class WatchList extends React.Component {

    static navigationOptions = {
        header: () => {}
    };

    constructor() {
        super();
        this.state = {
            "coin": null,
            "coinText": "No con selected"
        };
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
        const { navigate } = this.props.navigation;
        Keyboard.dismiss();
        navigate("SearchResults", {query: query});
    }

    generateRandomData = (points = 6) => {
        function range (start, end) {
            return new Array(end - start).fill().map((d, i) => i + start);
        }
        return range(1, points + 1).map((i) => ({x: i, y: i + Math.random(-1, 2)}));
    }

    render() {
        return (
            <View style={[{paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight}, styles.container]}>
                <StatusBar style={{marginTop: 50}} backgroundColor="red" barStyle="light-content"/>
                <Search  onSearchSubmit={this.onSearchSubmit}/>
                <TextInput style={{width: 100}} onChangeText={(text) => this.setState({"input": text})}/>
                <Button title="press me" onPress={this.lookupCoin} />
                <Text>{this.state.coinText}</Text>
                <VictoryBar
                    data={this.generateRandomData()}
                />
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
