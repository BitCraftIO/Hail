import React from 'react';
import {FlatList, StyleSheet, Text, View, TextInput, Button, Platform, NativeModules, StatusBar, Keyboard} from 'react-native';
import PropTypes from 'prop-types';
import {createWalletLocally} from "../../../../localstorage/realm"

export default class MakeOrReceiveTransactionPage extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			successInfo: ""
		}
	}

	_createWalletWithPredefinedData() {
		this.setState({
				successInfo: "..."
			})

		const options = {
            symbol: "BTC",
            aggregateCoins: 1.34,
            name: "Personal Wallet",
            aggregateValue: 15.123,
            percentageGrowth: 53,
            key: 1,
            walletID: 123
        } 

		createWalletLocally(options)
		.then((bool) => {
			this.setState({
				successInfo: "success"
			})
		})

	}

	render() {
		return (
			<View>
				<Button 
					title={"CreateWallet with predefined data"}
					onPress={this._createWalletWithPredefinedData()}
				/>
				<Text>{this.state.successInfo}</Text>
			</View>
		);
	}
}