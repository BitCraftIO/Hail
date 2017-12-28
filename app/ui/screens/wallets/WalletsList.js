import React from 'react';
import {Header, SectionList, FlatList, StyleSheet, Text, View, TextInput, Button, Platform, NativeModules, StatusBar, Keyboard} from 'react-native';
import WalletElement from "./WalletElement.js"

export default class WalletsList extends React.Component {

    walletData = [
        {
            symbol: "BTC",
            aggregateCoins: 1.34,
            name: "Personal Wallet",
            aggregateValue: 15.123,
            percentageGrowth: 53,
            key: 1,
            walletID: 123
        },
        {
            symbol: "ETH",
            aggregateCoins: 0.56,
            name: "Public Wallet",
            aggregateValue: 141.23,
            percentageGrowth: -53,
            key: 2,
            walletID: 124
        },
        {
            symbol: "XMR",
            aggregateCoins: 300.34,
            name: "Savings",
            aggregateValue: 150,
            percentageGrowth: 400,
            key: 3,
            walletID: 125
        },
    ]

    exchangeWalletData = [
        {
            symbol: "BTC",
            aggregateCoins: 1.34,
            name: "COINBASE",
            aggregateValue: 15.123,
            percentageGrowth: 53,
            key: 1,
            walletID: 123
        },
        {
            symbol: "ETH",
            aggregateCoins: 0.56,
            name: "GEMINI",
            aggregateValue: 141.23,
            percentageGrowth: -53,
            key: 2,
            walletID: 124
        },
        {
            symbol: "XMR",
            aggregateCoins: 300.34,
            name: "BITFINEX",
            aggregateValue: 150,
            percentageGrowth: 400,
            key: 3,
            walletID: 125
        },
    ]

	static navigationOptions = {
        header: () => {
        }
    };

    constructor() {
        super();
        this.state = {
            "localWallets": true,
            "walletData": this.walletData,
            "exchangeWallets": true,
            "exchangeWalletData":this.exchangeWalletData
        };
    }

    openWallet = (walletID) => {
        const {navigate} = this.props.navigation;
        navigate("WalletDetailsPage", {"walletID": walletID});
    }

    render() {
        return (
            <View style={styles.background}>
                <SectionList
                    style={styles.list}
                    renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title} </Text>}
                    sections ={[
                        {
                            //data: this.state.walletData,
                            data: [
                                {
                                    symbol: "BTC",
                                    aggregateCoins: 1.34,
                                    name: "Personal Wallet",
                                    aggregateValue: 15.123,
                                    percentageGrowth: 53,
                                    key: 1,
                                    walletID: 123
                                },
                                {
                                    symbol: "ETH",
                                    aggregateCoins: 0.56,
                                    name: "Public Wallet",
                                    aggregateValue: 141.23,
                                    percentageGrowth: -53,
                                    key: 2,
                                    walletID: 124
                                },
                                {
                                    symbol: "XMR",
                                    aggregateCoins: 300.34,
                                    name: "Savings",
                                    aggregateValue: 150,
                                    percentageGrowth: 400,
                                    key: 3,
                                    walletID: 125
                                },
                            ],
                            title: "Local Wallets",
                            renderItem: (wallet) => 
                                <WalletElement
                                       symbol={wallet.item.symbol}
                                       aggregateCoins={wallet.item.aggregateCoins}
                                       name={wallet.item.name}
                                       aggregateValue={wallet.item.aggregateValue}
                                       percentageGrowth={wallet.item.percentageGrowth}
                                       onPress={() => this.openWallet(wallet.item.walletID)}
                               />
    
                            
                        },
                        {
                            //data: this.state.exchangeWalletData,
                            data: [
                                {
                                    symbol: "BTC",
                                    aggregateCoins: 1.34,
                                    name: "COINBASE",
                                    aggregateValue: 15.123,
                                    percentageGrowth: 53,
                                    key: 1,
                                    walletID: 123
                                },
                                {
                                    symbol: "ETH",
                                    aggregateCoins: 0.56,
                                    name: "GEMINI",
                                    aggregateValue: 141.23,
                                    percentageGrowth: -53,
                                    key: 2,
                                    walletID: 124
                                },
                                {
                                    symbol: "XMR",
                                    aggregateCoins: 300.34,
                                    name: "BITFINEX",
                                    aggregateValue: 150,
                                    percentageGrowth: 400,
                                    key: 3,
                                    walletID: 125
                                },
                            ],
                            title: "Exchange Wallets",
                            renderItem: (wallet) => 
                                <WalletElement
                                       symbol={wallet.item.symbol}
                                       aggregateCoins={wallet.item.aggregateCoins}
                                       name={wallet.item.name}
                                       aggregateValue={wallet.item.aggregateValue}
                                       percentageGrowth={wallet.item.percentageGrowth}
                                       onPress={() => this.openWallet(wallet.item.walletID)}
                               />
                            
                        },
                    ]}
                    
                />
            </View>

        );
    };
}

styles = StyleSheet.create({
    background: {
        flex: 1,
        //backgroundColor: '#11151c',
        alignItems: 'center',
        backgroundColor: '#11151c',
    },
    list: {
        paddingTop: 70,
    },
    sectionHeader: {
        fontFamily: "Avenir",
        fontSize: 9,
        color: "#9b9b9b",
        paddingTop: 30,
        paddingBottom: 15
    },
});