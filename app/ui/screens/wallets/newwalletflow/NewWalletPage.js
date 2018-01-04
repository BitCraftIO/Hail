import React from "react";
import {CheckBox, FlatList, StyleSheet, Text, View, TextInput, Button, Platform, NativeModules, StatusBar, Keyboard} from "react-native";
import PropTypes from "prop-types";
import * as actions from "../../../../localstorage/Actions";


export default class MakeOrReceiveTransactionPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			successInfo: "",
			name: "null",
			typeleftchecked: false,
			typerightchecked: false
		};
	}

	_createWalletWithPredefinedData() {
		this.setState({
			successInfo: "...",
			name: "Savings",
		});

		//const id = Math.floor(Math.random * 1000);
		const options = {
			id: 4,
			network: "BTC",
			name: "Personal Wallet",
			masterKey: "Masterkey string",
			receiveAddresses: [
				"receiveAddr 1",
				"receiveAddr 2"
			],
			changeAddress: "changeAddress string",
			transactions: [
				{
					id: 1,
					tx: "tx str",
					fee: 2,
					input: [
						"input tx str"
					],
					output: [
						"output tx str"
					],
				},
				{
					id: 2,
					tx: "tx str",
					fee: 2,
					input: [
						"input tx str"
					],
					output: [
						"output tx str"
					],
				}

			],
		}; 

		actions.createWallet(options);
	}

	_pressTypeCheckBox(box) {

		if (box == "left") {
			this.state.typeleftchecked = true;
			this.state.typerightchecked = false;
			this.state.type = "exchange"
		}
		else if (box == "right") {
			this.state.typeleftchecked = true;
			this.state.typerightchecked = true;
			this.state.type = "localwallet";
		}

	}

	render() {
		return (
			<View>
				<Text>Wallet Name</Text>
				<TextInput
					onChangeText={(text) => this.setState({name: text})}
					value={this.state.name}
					placeholder={this.state.name}
				/>
				<Text>Type</Text>
				<View>
					<CheckBox 
						title="Exchange"
						checked={this.state.typeleftchecked}
						right={true}
						onPress={() => this._pressTypeCheckBox("left")}
					/>
					<CheckBox 
						title="LocalWallet"
						checked={this.state.typerightchecked}
						onPress={() => this._pressTypeCheckBox("right")}
					/>
				</View>
				
				<Button 
					title={"CreateWallet with predefined data"}
					onPress={() => this._createWalletWithPredefinedData()}
				/>
				<Text>{this.state.successInfo}</Text>
			</View>
		);
	}
}