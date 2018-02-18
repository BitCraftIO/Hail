import React from "react";
import {FlatList, StyleSheet, Text, View, TextInput, Button, Platform, NativeModules, StatusBar, Keyboard} from "react-native";
import {CheckBox} from "react-native-elements"
import PropTypes from "prop-types";
import * as actions from "hail/app/ui/screens/wallets/utils/Actions";
import * as idhelper from "hail/app/ui/screens/wallets/utils/idhelper";
import * as wallet from "hail/app/ui/screens/wallets/utils/WalletActions";

export default class NewWalletPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			successInfo: "",
			name: "null",
			typeleftchecked: false,
			typerightchecked: false,
			btcchecked: false,
			ltcchecked: false,
			ethchecked: false,
			testnet: true,
			coin: null,
			type: null,
			id: null,
		};
	}

	static navigationOptions = {
        header: () => {}
    };

	goBack() {
		const { navigation } = this.props;
		navigation.goBack();
		navigation.state.params.refresh();
		
	}

	createWallet() {
		this.setState({
			successInfo: "...",
		});

		if (this.state.coin === null|| this.state.name === null || this.state.type === null) {
			alert("Please input all fields")
			this.setState({
				successInfo: "Failed",
			});
			return
		}
		if (this.state.type == "exchange") {
			alert("No exchanges implemented");
			return
		}
		else {
			
			var options = {
				id: idhelper.createId("local", this.state.coin),
				coin: this.state.coin,
				network: this.state.testnet? 'test' : 'main',
				receiveAddresses: [
					"receiveAddr 1",
				],
				masterKey: "Masterkey string",
				changeAddress: "changeAddress string",
			}; 

			//this is gross
			switch (this.state.coin) {
				case "BTC":
					options.BTCTransaction = [
						{
							id: Math.floor(Math.random()*10000000000),
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
							id: Math.floor(Math.random()*10000000000),
							tx: "tx str",
							fee: 2,
							input: [
								"input tx str"
							],
							output: [
								"output tx str"
							],
						}
					]
					break;
				case "LTC":
					options.LTCTransaction = [
						{
							id: Math.floor(Math.random()*10000000000),
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
							id: Math.floor(Math.random()*10000000000),
							tx: "tx str",
							fee: 2,
							input: [
								"input tx str"
							],
							output: [
								"output tx str"
							],
						}
					]
					break;
				case "ETH": 
					const result = wallet.createPrivateKeyPair(this.state.coin);
					console.log(result);
					break;
				default:
					console.log("Switch broke");
			}

			actions.createWallet(options);
		}
		this.setState({
			successInfo: "Successful",
		});
	}

	_pressTypeCheckBox(box) {

		if (box == "left") {
			this.setState({
				typeleftchecked: true,
				typerightchecked: false,
				type: "exchange"
			})
		}
		else if (box == "right") {
			this.setState({
				typeleftchecked: false,
				typerightchecked: true,
				type: "localwallet"
			});
		}
	}

	_pressWalletTypeCheckBox(symbol) {
		switch (symbol) {
			case "BTC":
				this.setState({
					btcchecked: true,
					ltcchecked: false,
					ethchecked: false,
					coin: "BTC"
				});
				break;
			case "LTC":
				this.setState({
					btcchecked: false,
					ltcchecked: true,
					ethchecked: false,
					coin: "LTC"
				});
				break;
			case "ETH":
				this.setState({
					btcchecked: false,
					ltcchecked: false,
					ethchecked: true,
					coin: "ETH"
				});
				break;
			default:
				alert("This should never occur: " + symbol);
		}
	}

	render() {
		return (
			<View>
				<Button 
					title={"Back"}
					onPress={() => {this.goBack()}}
				/>
				<Text>Wallet Name</Text>
				<TextInput
					onChangeText={(text) => this.setState({name: text})}
					value={this.state.name}
					placeholder={this.state.name}
				/>
				<View style={{paddingTop: 30}}>
					<Text>id</Text>
					<TextInput
						onChangeText={(text) => this.setState({id: Number(text)})}
						value={String(this.state.id)}
						placeholder={"null"}
					/>
				</View>
				<View style={{paddingTop: 30}}>
					<Text>Type</Text>
					<View style={{flexDirection: 'row'}}>
						<View>
							<CheckBox 
								title="Exchange"
								checked={this.state.typeleftchecked}
								right={true}
								onPress={() => this._pressTypeCheckBox("left")}
							/>
						</View>
						<View>
							<CheckBox 
								title="LocalWallet"
								checked={this.state.typerightchecked}
								onPress={() => this._pressTypeCheckBox("right")}
							/>
						</View>
					</View>
				</View>
				<View style={{paddingTop: 30}}>
					<Text>LocalWallet Type</Text>
					<View style={{flexDirection: 'row'}}>
						<View>
							<CheckBox
								title="BTC"
								checked={this.state.btcchecked}
								right={true}
								onPress={() => this._pressWalletTypeCheckBox("BTC")}
							/>
						</View>
						<View>
							<CheckBox 
								title="LTC"
								checked={this.state.ltcchecked}
								onPress={() => this._pressWalletTypeCheckBox("LTC")}
							/>
						</View>
						<View>
							<CheckBox 
								title="ETH"
								checked={this.state.ethchecked}
								onPress={() => this._pressWalletTypeCheckBox("ETH")}
							/>
						</View>
					</View>
					<CheckBox
						title="Testnet"
						checked={this.state.testnet}
						onPress={() => {this.setState({testnet: !this.state.testnet})}}
						right={true}
					/>
				</View>
				
				<Button 
					title={"CreateWallet"}
					onPress={() => this.createWallet()}
				/>
				<Text>{this.state.successInfo}</Text>
			</View>
		);
	}
}