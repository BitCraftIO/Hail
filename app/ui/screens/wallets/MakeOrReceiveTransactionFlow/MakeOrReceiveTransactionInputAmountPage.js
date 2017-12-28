import React from 'react';
import {FlatList, StyleSheet, Text, View, TextInput, Button, Platform, NativeModules, StatusBar, Keyboard} from 'react-native';
import PropTypes from 'prop-types';


export default class MakeOrReceiveTransactionInputAmountPage extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			"address": this.props.navigation.state.params.address,
			"address": this.props.navigation.state.params.address,
        	"walletID": this.props.navigation.state.params.walletID,
			"network": this.props.navigation.state.params.network,
        	"aggregateCoins": this.props.navigation.state.params.aggregateCoins,
        	"aggregateValue": this.props.navigation.state.params.aggregateValue,
		}
	};

	render() {
		return (
			<View>
				<View>
					<Text>{this.state.address}</Text>
				</View>
				<View>
					<Text>{this.state.aggregateCoins}</Text>
				</View>
				<View>
					<Text>{this.state.aggregateValue['value'] + " " + this.state.aggregateValue['currency']}</Text>
				</View>
				<View>
					<Text>{this.state.network}</Text>
				</View>

			</View>
		)
	};
}