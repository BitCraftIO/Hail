import React from 'react';
import {FlatList, StyleSheet, Text, View, TextInput, Button, Platform, NativeModules, StatusBar, Keyboard} from 'react-native';
import PropTypes from 'prop-types';

export default class MakeOrReceiveTransactionPage extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			"text": "Type your Address here",
			"walletID": this.props.navigation.state.params.walletID,
			"network": this.props.navigation.state.params.network,
        	"aggregateCoins": this.props.navigation.state.params.aggregateCoins,
        	"aggregateValue": this.props.navigation.state.params.aggregateValue,
        	"isfailureBannerVisible": false,
		}
	}

	goToNextPage(address) {
		if (this.checkIfValidAddress(address)) {
			const {navigate} = this.props.navigation;
	        navigate("MakeOrReceiveTransactionInputAmountPage", {
	        	"address": this.state.text,
	        	"walletID": this.state.walletID,
				"network": this.state.network,
	        	"aggregateCoins": this.state.aggregateCoins,
	        	"aggregateValue": this.state.aggregateValue,
	        });
		}
		else {
			this.setState({
				"isfailureBannerVisible": true,
			})
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

	//TODO: Compartmentalize these components dawg
	render() {
		return null
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
    failureBannerText: {
    	color: 'white',
    	//alignItems: 'center',
    },
    // list: {
    //     paddingTop: 70,
    // },
    // sectionHeader: {
    //     fontFamily: "Avenir",
    //     fontSize: 9,
    //     color: "#9b9b9b",
    //     paddingTop: 30,
    //     paddingBottom: 15
    // },
});