import React from "react";
import {FlatList, StyleSheet, Text, View, TextInput, Button, Platform, NativeModules, StatusBar, Keyboard} from "react-native";
import {CheckBox} from "react-native-elements"
import PropTypes from "prop-types";
import * as actions from "../../../../localstorage/Actions";


export default class MakeOrReceiveTransactionPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			successInfo: "",
			name: "null",
			typeleftchecked: false,
			typerightchecked: false,
			btcchecked: false,
			ltcchecked: false,
			xmrchecked: false,
			network: null,
			type: null,
			id: Math.floor(Math.random()*10000000000)
		};
	}

	createWallet() {
		this.setState({
			successInfo: "...",
		});

		//const id = Math.floor(Math.random * 1000);

		if (this.state.network === null|| this.state.name === null || this.state.type === null) {
			alert("Please input all fields")
			this.setState({
				successInfo: "Failed",
			});
			return
		}
		if (this.state.type == "exchange") {
			return
		}
		else {
			const options = {
				id: this.state.id,
				network: this.state.network,
				name: this.state.name,
				receiveAddresses: [
					"receiveAddr 1",
				],
				masterKey: "Masterkey string",
				changeAddress: "changeAddress string",
				transactions: [
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
	
				],
			}; 
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
					xmrchecked: false,
					network: "BTC"
				});
				break;
			case "LTC":
				this.setState({
					btcchecked: false,
					ltcchecked: true,
					xmrchecked: false,
					network: "LTC"
				});
				break;
			case "XMR":
				this.setState({
					btcchecked: false,
					ltcchecked: false,
					xmrchecked: true,
					network: "XMR"
				});
				break;
			default:
				alert("This should never occur: " + symbol);
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
								title="XMR"
								checked={this.state.xmrchecked}
								onPress={() => this._pressWalletTypeCheckBox("XMR")}
							/>
						</View>
					</View>
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