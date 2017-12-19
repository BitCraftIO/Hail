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
            "localWallets": false,
            "walletData": [],
            "exchangeWallets": false,
            "exchangeData":[]
        };
    }

    render() {
        return (
            <View style={styles.container}>
               
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#11151c'
    },
});