import React from 'react';
import {FlatList, StyleSheet, Text, View, TextInput, Button, Platform, NativeModules, Keyboard} from 'react-native';
import {CheckBox} from "react-native-elements"
import PropTypes from 'prop-types';

export default class TransactionPage extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			"action": null,
			"address": "",
			"amount": "",
			"fee": "",
			"typeleftchecked": false,
			"typerightchecked": false,
		}
	}

	checkIfValidAddress(address) {
		isValid = true
		this.setState({
			"isfailureBannerVisible": !isValid,
		});
		return isValid;
	}

	_renderFailureBanner() {
		if (this.state.isfailureBannerVisible) {
			return (
				<View style={styles.failureBanner}>
					<Text style={styles.failureBannerText}> Address Not Valid </Text>
				</View>
			)
		}
		else {
			return null;
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

	sendActionView(state) {
		this.state = state;
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

	}

	receiveActionView() {

	}

	//TODO: Compartmentalize these components dawg
	render() {
		return (
			<View>
				{this.chooseActionView()}
				{this.action()}
			</View>			
		)
	}

}

styles = StyleSheet.create({
    background: {
        flex: 1,
        //backgroundColor: '#11151c',
        alignItems: 'center',
        backgroundColor: '#11151c',
    },
    inputBox: {
    	borderColor: '#000000',

    },
    failureBanner: {
    	backgroundColor: 'red',
    	height: 20,
		alignSelf: 'stretch',
    	textAlign: 'center',   
    },

});