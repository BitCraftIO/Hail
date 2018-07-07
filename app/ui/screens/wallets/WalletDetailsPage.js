import React from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight, Image } from 'react-native';
import TransactionList from './components/TransactionList';
import PropTypes from 'prop-types';
import currencyFormatter from 'currency-formatter';
import * as dbActions from 'hail/app/localstorage/db/utils/Actions';
import { getCoinGraphData, getPriceFromGraphData } from '../../../coin/CoinRequestGraphMapper';

import {Colors} from "../Colors";
import ImageButton from '../../../components/ImageButton';
import Images from '../../../utils/ImageLoader';

export default class WalletDetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wallet: props.wallet,
            graphData: {}
        };
    }

    async populateGraphData() {
        let graphData = await getCoinGraphData(this.state.wallet.coin);
        this.setState({
            graphData: graphData
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

    goToTransactionPage() {
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

    toSettingsPage() {
        const {navigate} = this.props.navigation;
        navigate("SettingsPage");
    }

    getFiatText(wallet) {
        let price = this.getCurrentPrice();

        if (price != null) {
            let fiat = price * wallet.value;
            return currencyFormatter.format(fiat, { code: 'USD' })
        } else {
            this.populateGraphData();
            return '$--.--';
        }
    }

    addresses() {
        return this.state.wallet.addresses.map(walletaddr => {
            return <Text> {walletaddr.address} </Text>;
        });
    }

    render() {
        const { wallet } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.walletHeaderContainer}>
                    <ImageButton
                        onPress={this.goBack.bind(this)}
                        source={Images.arrowLeft}
                    />

                    <Text style={styles.walletNameText}>{wallet.name}</Text>

                    <ImageButton
                        onPress={this.toSettingsPage.bind(this)}
                        source={Images.optionsHollow}
                    />
                </View>

                <View style={styles.firstLineRowWrapper}>
                    <View style={styles.firstLine} />
                    <Text style={styles.coinNameText}>{wallet.coin}</Text>
                    <View style={styles.firstLine} />
                </View>

                <View style={styles.valuesWrapper}>
                    <View style={styles.fillView}>
                        <Text 
                            style={styles.numberText}
                            numberOfLines={1}
                        >
                            {this.getFiatText(wallet)}
                        </Text>
                    </View>

                    <View style={styles.verticalLine} />

                    <View style={styles.fillView}>
                        <View style={styles.amountValueTextWrapper}>
                            <Text style={styles.numberText}>{wallet.value}</Text>
                            <Text style={styles.coinNameText}>{wallet.coin}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.horizontalLine} />

                <TransactionList
                    coin={wallet.coin}
                    transactions={wallet.transactions}
                />

                <View style={styles.buttonContainer}>
                    <TouchableHighlight onPress={this.goToTransactionPage.bind(this)}>
                        <View style={styles.transactionButton}>
                            <Image 
                                source={Images.movingCoin}
                                style={styles.transactionButtonImage}
                                resizeMode={'contain'}
                            />
                            <Text style={styles.transactionButtonText}>Send / Request</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: Colors.SecondaryBackground,
    },

    walletHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15
    },

    walletNameText: {
        color: 'white',
        fontSize: 30,
    },

    firstLineRowWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15
    },

    firstLine: {
        backgroundColor: 'white',
        flex: 1,
        height: 1,
        marginHorizontal: 10
    },

    coinNameText: {
        color: 'white',
        fontSize: 16,
        marginHorizontal: 10,
        marginBottom: 5,
    },

    valuesWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },

    numberText: {
        color: 'white',
        fontSize: 30,
    },

    amountValueTextWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },

    verticalLine: {
        backgroundColor: 'white',
        height: 75,
        width: 1
    },

    fillView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '5%'
    },

    horizontalLine: {
        backgroundColor: 'white',
        height: 1,
        width: '95%',
        alignSelf: 'center',
        marginTop: 15
    },

    buttonContainer: {
        position: 'absolute',
        bottom: 40,
        right: 25
    },

    // Transaction Button
    transactionButton: {
        width: 160,
        height: 50,
        borderRadius: 5,
        backgroundColor: Colors.ActionGreen,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    transactionButtonText: {
        color: 'white',
        fontSize: 14
    },

    transactionButtonImage: {
        width: 30,
        marginRight: 8
    }
});
