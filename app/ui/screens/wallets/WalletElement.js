import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View, TextInput, Button, Platform, NativeModules, StatusBar, Keyboard} from 'react-native';
import PropTypes from 'prop-types';

export default class WalletElement extends React.PureComponent {

    constructor(props) {
    	super(props)
    }

	static propTypes = {
		symbol: PropTypes.string.isRequired,
        aggregateCoins: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        aggregateValue: PropTypes.number.isRequired,
        percentageGrowth: PropTypes.number.isRequired
    }

	render() {
		//TODO: Change percentageGrowth font color to #c84630 if negative
		return (
			<TouchableOpacity style={styles.background} onPress={this.props.onPress}>
				<View style={
					{
						flexDirection: 'row', 
						justifyContent: 'space-between',
					}}>
					<View>
						<Text style={styles.symbol}>{this.props.symbol}</Text>
						<Text style={styles.aggregateCoins}>{this.props.aggregateCoins}</Text>
					</View>
					<View style={
						{
							paddingLeft: 20,
							paddingRight: 20
						}}>
						<Text style={styles.name}>{this.props.name}</Text>
					</View>
				</View>
				<View style={
					{
						//flex: 1, 
						flexDirection: 'row', 
						justifyContent: 'space-between',
						paddingLeft: 8
					}}>
					<Text style={styles.aggregateValue}>{this.props.aggregateValue}</Text>
					<Text style={styles.percentageGrowth}>{this.props.percentageGrowth}</Text>
				</View>
			</TouchableOpacity>
		);
	};
}

const styles = StyleSheet.create({
    background: {
		height: 70,
		paddingLeft: 20,
		paddingRight: 20,
		//borderRadius: 3.3,
		backgroundColor: "#212d40",
		flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

	},
	symbol: {
		// height: 12.7,
		// fontFamily: "Avenir",
		// fontSize: 9.3,
		// textAlign: "center",
		// color: "#ffffff"
		//width: 29.9,
		//height: 15.3,
		fontFamily: "Avenir",
		fontSize: 17,
		fontWeight: "900",
		//textAlign: "left",
		color: "#ffffff"
	},
	aggregateCoins: {
		//height: 5.3,
		//paddingLeft: 8,
		fontFamily: "Avenir",
		fontSize: 12,
		//textAlign: "left",
		color: "#ffffff"
	},
	name: {
		//height: 9.3,
		//paddingLeft: 16,
		fontFamily: "Avenir",
		fontSize: 13,
		//textAlign: "center",
		color: "#ffffff"
	},
	aggregateValue: {
		//height: 22,
		//paddingLeft: 16,
		fontFamily: "Avenir",
		fontSize: 24,
		paddingTop: 12,
		color: "#ffffff"
	},
	percentageGrowth: {
		//height: 15.3,
		paddingLeft: 14,
		paddingTop: 24,
		fontFamily: "Avenir",
		fontSize: 11.3,
		color: "#4ce0b3"
	}
});