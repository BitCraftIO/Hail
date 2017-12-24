import React from 'react';
import {FlatList, StyleSheet, Text, View, TextInput, Button, Platform, NativeModules, StatusBar, Keyboard} from 'react-native';
import PropTypes from 'prop-types';

export default class WalletsList extends React.Component {
	constructor(props) {
    	super(props)
    	const wallet = this.getWalletFromID(this.props.navigation.state.params.walletID)
    	this.state = {
            walletID: this.props.navigation.state.params.walletID,
            wallet: wallet 
        };
    }

    getWalletFromID(id) {
    	//TODO: Implement datasource
    	const data = {
			123: {
				name: "Personal Wallet",
				network: "BTC",
				masterKey: "29sfdsf8gudsfgslsdfgAV",
				id: 123,
				receiveAddresses: [
					"ASDFASDFSAGDSFGssfg"
				],
				changeAddress: "ASDFASDFSAGDSFGssfg",
				transactions: [
					{
						inputs: ["ASDFASDFSAGDSFGssfg"],
						outputs: ["ASDFASDFSAGDSFGssfg"]
					}
				],
				aggregateCoins: () => {
					//counts coins
					return 1.34
				},
				aggregateValue: () => {
					//pass aggregate coins to server and ask for price data
					return 15.123
				}
			},
			124: {
				name: "Public Wallet",
				network: "ETH",
				masterKey: "29sfdsf8gudsfgslsdfgAV",
				id: 124,
				receiveAddresses: [
					"ASDFASDFSAGDSFGssfg"
				],
				changeAddress: "ASDFASDFSAGDSFGssfg",
				transactions: [
					{
						inputs: ["ASDFASDFSAGDSFGssfg"],
						outputs: ["ASDFASDFSAGDSFGssfg"]
					}
				],
				aggregateCoins: () => {
					//counts coins
					return 1.34
				},
				aggregateValue: () => {
					//pass aggregate coins to server and ask for price data
					return 15.123
				}
			},
			125: {
				name: "Personal Wallet",
				network: "XMR",
				masterKey: "29sfdsf8gudsfgslsdfgAV",
				id: 125,
				receiveAddresses: [
					"ASDFASDFSAGDSFGssfg"
				],
				changeAddress: "ASDFASDFSAGDSFGssfg",
				transactions: [
					{
						inputs: ["ASDFASDFSAGDSFGssfg"],
						outputs: ["ASDFASDFSAGDSFGssfg"]
					}
				],
				aggregateCoins: () => {
					//counts coins
					return 1.34
				},
				aggregateValue: () => {
					//pass aggregate coins to server and ask for price data
					return 15.123
				}
			}
    	}
    	return data[id]
    }

	static propTypes = {
        //walletID: PropTypes.number.isRequired,
    }

    makeOrReceiveTransaction = (walletID) => {
        const {navigate} = this.props.navigation;
        navigate("MakeOrReceiveTransactionPage", {"walletID": walletID});
    }

	render() {
		return (
			<View>
				<Text> {this.state.walletID} </Text>
				<Text> {this.state.wallet.name} </Text>
				<Text> {this.state.wallet.network} </Text>
				<Text> {this.state.wallet.aggregateCoins()} </Text>
				<Text> {this.state.wallet.aggregateValue()} </Text>
				<Button 
					title="MakeOrReceiveTransaction"
					onPress={() => this.makeOrReceiveTransaction(this.state.walletID)} 
				/>
			</View>
		);
	};
}

const styles = StyleSheet.create({

})