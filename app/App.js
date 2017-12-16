import React from 'react';
import { Text, View, TextInput, Button} from 'react-native';
import { getCoinDetails } from './Api';
import {styles} from "./currency/CurrencyDetailStyles";

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
                "coinText": `'${this.state.input}' is not a valid coin.`
            })
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={{width: 300}} onChangeText={(text) => this.setState({"input": text})}/>
                <Button title="press me" onPress={this.lookupCoin} />
                <Text>{this.state.coinText}</Text>
            </View>
        );
    }
}
