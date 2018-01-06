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
        this.state = {
            "localWallets": true,
            "exchangeWallets": true,
            //Realm results objects
            "localWalletData": queries.getLocalWallets().sorted('id'),
            "exchangeWalletData": queries.getExchangeWallets().sorted('id'), 
        };
        
        //Mark listeners
        this.state.localWalletData.addListener((wallets, changes) => {

            //Better than doing forceUpdate
            this.setState({
                localWalletData: queries.getLocalWallets().sorted('id')
            });
        });

        this.state.exchangeWalletData.addListener((wallets, changes) => {
            this.setState({
                exchangeWalletData:  queries.getExchangeWallets().sorted('id')
            });
        });
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
                            data: this.state.localWalletData,
                            title: "Local Wallets",
                            renderItem: (wallet) => 
                                <WalletElement
                                       symbol={wallet.item.network}
                                       aggregateCoins={0}
                                       name={wallet.item.name}
                                       aggregateValue={0}
                                       percentageGrowth={0}
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