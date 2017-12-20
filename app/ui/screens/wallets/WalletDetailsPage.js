import React from 'react';
import {FlatList, StyleSheet, Text, View, TextInput, Button, Platform, NativeModules, StatusBar, Keyboard} from 'react-native';
import PropTypes from 'prop-types';

export default class WalletsList extends React.Component {
	constructor(props) {
    	super(props)
    	this.state = {
            "walletID": 0,
        };
    }

	static propTypes = {
        //walletID: PropTypes.number.isRequired,
    }

	render() {
		return (
			<View>
				<Text> {this.props.navigation.state.params.walletID} </Text>
			</View>
		);
	};
}

const styles = StyleSheet.create({

})