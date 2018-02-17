import React from 'react';
import {FlatList, StyleSheet, Text, View, TextInput, Button, Platform, NativeModules, StatusBar, Keyboard} from 'react-native';
import PropTypes from 'prop-types';
import * as actions from "hail/app/ui/screens/wallets/utils/Actions";

export default class WalletDetailsPage extends React.Component {
	
	constructor(props) {
		super(props)
		
		this.state = {
			wallet: props.navigation.state.params.wallet,
			renderSuccess: false,
		};
    }

    goToTransactionPage = (walletID) => {

    }

    deleteThisWallet(id) {
		actions.deleteWalletById(id);
		const { navigation } = this.props;
		navigation.state.params.refresh();
		this.goBack();
	}

	goBack() {
		const { navigation } = this.props;
		navigation.goBack();
	}
	
	_renderSuccess(){
		return (
			<Text>Success</Text>
		);
	}

	render() {
		return (
			<View>
				<Text> {this.state.wallet.id} </Text>
				<Text> {this.state.wallet.name} </Text>
				<Text> {this.state.wallet.network} </Text>
				<Text> {this.state.wallet.aggregateCoins} </Text>
				<Text> {this.state.wallet.aggregateValue} </Text>
				<Button 
					title="Make a Tx"
					onPress={() => this.goToTransactionPage(this.state.walletID)} 
				/>
				<Button 
                    title={"Delete Wallet"}
                    onPress={() => this.deleteThisWallet(this.state.wallet.id)}
                />
				{this.state.renderSuccess ? this._renderSuccess : null}
			</View>
		);
	};
}

const styles = StyleSheet.create({

})