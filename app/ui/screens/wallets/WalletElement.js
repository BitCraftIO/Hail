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
				<Text style={styles.symbol}>{this.props.symbol}</Text>
				<Text style={styles.aggregateCoins}>{this.props.aggregateCoins}</Text>
				<Text style={styles.name}>{this.props.name}</Text>
				<Text style={styles.aggregateValue}>{this.props.aggregateValue}</Text>
				<Text style={styles.percentageGrowth}>{this.props.percentageGrowth}</Text>
			</View>
		);
	};
}

const styles = StyleSheet.create({
    background: {
		height: 101.3,
		paddingLeft: 40,
		paddingRight: 40,
		borderRadius: 3.3,
		backgroundColor: "#212d40",
		flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

	},
	symbol: {
		height: 12.7,
		paddingLeft: 8,
		fontFamily: "Avenir",
		fontSize: 9.3,
		textAlign: "center",
		color: "#ffffff"
	},
	aggregateCoins: {
		height: 5.3,
		paddingLeft: 8,
		fontFamily: "Avenir",
		fontSize: 4,
		textAlign: "center",
		color: "#ffffff"
	},
	name: {
		height: 9.3,
		paddingLeft: 8,
		fontFamily: "Avenir",
		fontSize: 6.7,
		textAlign: "center",
		color: "#ffffff"
	},
	aggregateValue: {
		height: 22,
		paddingLeft: 8,
		fontFamily: "Avenir",
		fontSize: 16,
		color: "#ffffff"
	},
	percentageGrowth: {
		height: 15.3,
		paddingLeft: 8,
		fontFamily: "Avenir",
		fontSize: 11.3,
		color: "#4ce0b3"
	}
});