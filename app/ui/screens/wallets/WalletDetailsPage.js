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
					return {value: 15.123, currency: "USD"}
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
					return {value: 15.123, currency: "USD"}
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
					return {value: 15.123, currency: "USD"}
				}
			}
    	}
    	return data[id]
    }

	static propTypes = {
        //walletID: PropTypes.number.isRequired,
    }

    goToMakeOrReceiveTransaction = (walletID) => {
        // const {navigate} = this.props.navigation;
        // navigate("MakeOrReceiveTransactionPage", {
        // 	"walletID": walletID, 
        // 	"network": this.state.wallet.network,
        // 	"aggregateCoins": this.state.wallet.aggregateCoins(),
        // 	"aggregateValue": this.state.wallet.aggregateValue(),
        // });
    }

    _deleteThisWallet() {

    }

	render() {
		return (
			<View>
				<Text> {this.state.walletID} </Text>
				<Text> {this.state.wallet.name} </Text>
				<Text> {this.state.wallet.network} </Text>
				<Text> {this.state.wallet.aggregateCoins()} </Text>
				<Text> {this.state.wallet.aggregateValue()['value']} </Text>
				<Button 
					title="MakeOrReceiveTransaction"
					onPress={() => this.goToMakeOrReceiveTransaction(this.state.walletID)} 
				/>
				<Button 
                    title={"Delete Wallet"}
                    onPress={this._deleteThisWallet()}
                />
			</View>
		);
	};
}

const styles = StyleSheet.create({

})