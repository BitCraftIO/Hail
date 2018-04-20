import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import PropTypes from 'prop-types';
import * as actions from 'hail/app/ui/screens/wallets/utils/Actions';
//import Blockies from 'react-blockies';

export default class WalletDetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wallet: props.navigation.state.params.wallet,
            renderSuccess: false
        };
    }

    goToTransactionPage(walletID) {
        this.props.navigation.navigate('TransactionPage', {
            wallet: this.state.wallet
        });
    }

    deleteThisWallet() {
        actions.deleteWallet(this.state.wallet);
        const { navigation } = this.props;
        navigation.state.params.refresh();
        this.goBack();
    }

    goBack() {
        const { navigation } = this.props;
        navigation.goBack();
    }

    renderSuccess() {
        return <Text>Success</Text>;
    }

    addresses() {
        return this.state.wallet.addresses.map(walletaddr => {
            return <Text> {walletaddr.address} </Text>;
        });
    }

    //TODO: Make this only show up if ethereum
    //TODO: https://github.com/AugurProject/react-blockies/issues/5
    identicon() {
        //return <Blockies seed={this.state.wallet.masterKey} />;
        return null;
    }

    render() {
        return (
            <View>
                {this.identicon()}
                <Text> Id: {this.state.wallet.id} </Text>
                <Text> Name: {this.state.wallet.name} </Text>
                <Text> Coin: {this.state.wallet.coin} </Text>
                <Text> Network: {this.state.wallet.network} </Text>
                <Text> Private Key: {this.state.wallet.privateKey ? this.state.wallet.privateKey : 'no masterkey'} </Text>
                <Button title="Make a Tx" onPress={() => this.goToTransactionPage()} />
                <Button title={'Delete Wallet'} onPress={() => this.deleteThisWallet()} />
                {this.state.renderSuccess ? this.renderSuccess : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({});
