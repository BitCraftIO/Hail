import React from 'react';
import {StyleSheet, Text, View, TextInput, Button, Platform, NativeModules, StatusBar, Keyboard} from 'react-native';


export default class WalletsList extends React.Component {
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

    render() {
        return (
            <View style={styles.container}>
               
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