import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import PropTypes from 'prop-types';
import * as actions from 'hail/app/ui/screens/wallets/utils/Actions';
import { getModelForId } from 'hail/app/ui/screens/wallets/utils/idhelper.js';
//import Blockies from 'react-blockies';

export default class WalletDetailsPage extends React.Component {
    constructor(props) {
        super(props);
        //TODO: After db refactor, get rid of garbage like this
        props.navigation.state.params.wallet.coin = getModelForId(props.navigation.state.params.wallet.id);
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

    _renderSuccess() {
        return <Text>Success</Text>;
    }

    addresses() {
        return this.state.wallet.address.map(addr => {
            return <Text> {addr} </Text>;
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
                <Text> Private Key: {this.state.wallet.masterKey ? this.state.wallet.masterKey : 'no masterkey'} </Text>
                {this.addresses()}
                <Button title="Make a Tx" onPress={() => this.goToTransactionPage()} />
                <Button title={'Delete Wallet'} onPress={() => this.deleteThisWallet(this.state.wallet.id)} />
                {this.state.renderSuccess ? this._renderSuccess : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({});
