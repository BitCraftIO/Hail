import React from 'react';
import {FlatList, StyleSheet, Clipboard, Text, View, TextInput, Button, Platform, NativeModules, Keyboard} from 'react-native';
import {CheckBox} from "react-native-elements"
import PropTypes from 'prop-types';

export default class TransactionPage extends React.Component {

	//You should have access to wallet in props
	constructor(props){
		super(props)
		this.state = {
			"action": null,
			"address": "",
			"amount": "",
			"fee": "",
			"typeleftchecked": false,
			"typerightchecked": false,
			"status": null,
		}
	}

	chooseActionView() {
		if(this.state.action == null ) {
			return (
				<View style={{paddingTop: 30}}>
					<Text>Send or Receive?</Text>
					<View style={{flexDirection: 'row'}}>
						<View>
							<CheckBox 
								title="Send"
								checked={this.state.typeleftchecked}
								right={true}
								onPress={() => this.chooseAction("send")}
							/>
						</View>
						<View>
							<CheckBox 
								title="Receive"
								checked={this.state.typerightchecked}
								onPress={() => this.chooseAction("receive")}
							/>
						</View>
					</View>
				</View>
			);
		}
		else {
			return null;
		}
	}

	chooseAction(action) {
		this.setState({
			action,
		});
	}

	action() {
		if(this.state.action != null ) {
			var act = null;
			if (this.state.action == "send") {
				act = this.sendActionView;
			}
			else {
				act = this.receiveActionView;
			}
			return (
				<View>
					{act(this.state)}
				</View>
			);
		} 
		else {
			return null;
		}

	}

	sendActionView = () => {
		return(
			<View>
				<View>
					<Text style={{fontWeight:'bold'}}>Address</Text>
					<TextInput
						onChangeText={(text) => this.setState({"address": text})}
						value={this.state.address}
						placeholder={'a string'}
						placeholderTextColor={'grey'}
					/>
				</View>
				<View style={{paddingTop: 20}}>
					<Text style={{fontWeight:'bold'}}>Amount</Text>
					<TextInput
						onChangeText={(text) => this.setState({"amount": text})}
						value={this.state.amount}
						placeholder={'a number'}
						placeholderTextColor={'grey'}
					/>
				</View>
				<View style={{paddingTop: 20}}>
					<Text style={{fontWeight:'bold'}}>Fee</Text>
					<TextInput
						onChangeText={(text) => this.setState({"fee": text})}
						value={this.state.fee}
						placeholder={'a number'}
						placeholderTextColor={'grey'}
					/>
					<Text>Recommended fee: {} </Text>
				</View>
				<View style={{paddingTop: 20}}>
					<Button
						title={'Send'}
						onPress={() => this.sendAction()}
					/>
				</View>
			</View>
		)
	}

	sendAction() {
		//TODO
	}

	receiveActionView = () => {
		//grab new addr from util
		const addr = "Some typical address";
		return (
			<View>
				<Text>{addr}</Text>
				<Button
					title={'Copy to clipboard'}
					onPress={() => this.copyToClipboard(addr)}
				/>
				<Button
					title={'Generate New Address'}
					onPress={() => this.generateNewAddress()}
				/>
			</View>
		)
	}

	copyToClipboard = (addr) => {
		Clipboard.setString(addr);
		this.setState({status: "Copied to Clipboard"});
	}

	generateNewAddress() {
		//TODO
	}

	status() {
		if (this.state.status != null) {
			return (
				<Text> {this.state.status} </Text>
			)
		}
		else {
			return null;
		}
	}

	render() {
		return (
			<View>
				{this.chooseActionView()}
				{this.action()}
				{this.status()}
			</View>			
		)
	}

}

styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#11151c',
    },
});