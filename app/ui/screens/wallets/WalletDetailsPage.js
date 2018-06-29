import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import PropTypes from 'prop-types';
import * as dbActions from 'hail/app/localstorage/db/utils/Actions';
import { getCoinGraphData, getPriceFromGraphData } from '../../../coin/CoinRequestGraphMapper';

export default class WalletDetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wallet: props.wallet,
            renderSuccess: false,
            renderPrice: false,
            graphData: {}
        };
    }

    async populateGraphData() {
        let graphData = await getCoinGraphData(this.state.wallet.coin);
        this.setState({
            graphData: graphData,
            renderPrice: true
        })
    }

    getCurrentPrice() {
        if (this.props.price) {
            return this.props.price;
        }

        const graphData = this.props.graphData || this.state.graphData;
        // If graphData empty, return and wait for state to update
        if (Object.keys(graphData).length === 0) {
            this.populateGraphData();
            return;
        }

        return getPriceFromGraphData(graphData);
    }

    getTransactions() {
        console.log(this.state.wallet.transactions);
        return this.state.wallet.transactions;
    }

    goToTransactionPage(walletID) {
        this.props.navigation.navigate('TransactionPage', {
            wallet: this.state.wallet
        });
    }

    deleteThisWallet() {
        dbActions.deleteWallet(this.state.wallet);
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

    renderCurrentPrice() {
        const price = this.getCurrentPrice();

        if (price) {
            return <Text>Fiat: {'$' + price}</Text>
        } else {
            this.populateGraphData();
            return null;
        }
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
                {this.renderCurrentPrice()}
                {this.state.renderSuccess ? this.renderSuccess : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({});
