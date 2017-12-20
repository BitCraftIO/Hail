import React from 'react';
import {StyleSheet, Text, View, TextInput, Button, Platform, NativeModules, StatusBar, Keyboard} from 'react-native';
import PropTypes from 'prop-types';

export default class WalletElement extends React.PureComponent {

    constructor() {
    	super()
    }

	static propTypes = {
		symbol: PropTypes.string.isRequired,
        aggregateCoins: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        aggregateValue: PropTypes.number.isRequired,
        percentageGrowth: PropTypes.number.isRequired
    }

	render() {
		console.log("Rendering WalletElement")
		return (
			<View style={styles.background}>
				<Text>{this.props.symbol}</Text>
				<Text>{this.props.aggregateCoins}</Text>
				<Text>{this.props.name}</Text>
				<Text>{this.props.aggregateValue}</Text>
				<Text>{this.props.percentageGrowth}</Text>
			</View>
		);
	};
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#212d40'
    },
});