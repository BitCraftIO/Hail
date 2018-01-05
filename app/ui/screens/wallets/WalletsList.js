import React from 'react';
import {Header, SectionList, FlatList, StyleSheet, Text, View, TextInput, Button, Platform, NativeModules, StatusBar, Keyboard} from 'react-native';
import * as Db from "../../../localstorage/db/Db";
import WalletElement from "./WalletElement.js";
import * as actions from "../../../localstorage/Actions";
import * as queries from "../../../localstorage/Queries";


export default class WalletsList extends React.Component {

	static navigationOptions = {
        header: () => {
}
    };

    constructor(props) {
        super(props);

        //Realm results objects
        this.localWallets = queries.getLocalWallets().sorted('id');
        this.exchangeWallets = queries.getExchangeWallets().sorted('id');
        //Mark listeners
        this.localWallets.addListener((wallets, changes) => {
            this.setState({
                walletData: this.localWallets
            });
            // changes.insertions.forEach((index) => {
            //     this.setState({
            //         walletData: this.walletData.push(wallets[index])
            //     });
            // });

            // changes.modifications.forEach((index) => {
            //     this.setState({
            //         walletData: this.localWallets
            //     });
            // });
        });
        this.exchangeWallets.addListener((wallets, changes) => {
            this.setState({
                exchangeWalletData: this.exchangeWallets
            });
        });

        this.state = {
            "localWallets": true,
            "walletData": this.localWallets,
            "exchangeWallets": true,
            "exchangeWalletData":this.exchangeWallets, 
        };
    }

    openWallet(walletID) {
        const {navigate} = this.props.navigation;
        navigate("WalletDetailsPage", {"walletID": walletID});
    }

    _newWallet() {
        const {navigate} = this.props.navigation;
        navigate("NewWalletPage");
    }

    render() {
        return (
            <View style={styles.background}>
                <Button 
                    title={"New Wallet"}
                    onPress={() => this._newWallet()}
                />
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

        )
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
    modal: {
        height: 230,
        backgroundColor: "#3B5998"
    },
});