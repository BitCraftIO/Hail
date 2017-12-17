import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Platform, StatusBar} from 'react-native';
import { getCoinDetails } from './../Api';
import Search from "./../search/Search";

export default class WatchList extends React.Component {

    static navigationOptions = {
        header: () => {}
    };

    constructor() {
        super();
        this.state = {
            "coin": null,
            "coinText": "No coi selected"
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

    onSearchSubmit = (query) => {
        const { navigate } = this.props.navigation;
        navigate("SearchResults", {query: query})
    }

    render() {
        return (
            <View style={[{paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight}, styles.container]}>
                <StatusBar style={{marginTop: 50}} backgroundColor="red" barStyle="light-content"/>
                <Search  onSearchSubmit={this.onSearchSubmit}/>
                <TextInput style={{width: 100}} onChangeText={(text) => this.setState({"input": text})}/>
                <Button title="press me" onPress={this.lookupCoin} />
                <Text>{this.state.coinText}</Text>
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
