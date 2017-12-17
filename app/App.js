import React from 'react';
import { Text, View, TextInput, Button, Platform, StatusBar} from 'react-native';
import { getCoinDetails } from './Api';
import {styles} from "./currency/CurrencyDetailStyles";
import Search from "./search/Search";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            "coin": null,
            "coinText": "No coin selected"
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
                "coinText": `'${this.state.input}' is not a alid coin.`
            })
        });
    }

    render() {
        return (
            <View style={[{paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight}, styles.container]}>
                <StatusBar style={{marginTop: 50}} backgroundColor="red" barStyle="light-content"/>
                <Search/>
                <TextInput style={{width: 100}} onChangeText={(text) => this.setState({"input": text})}/>
                <Button title="press me" onPress={this.lookupCoin} />
                <Text>{this.state.coinText}</Text>
            </View>
        );
    }
}
