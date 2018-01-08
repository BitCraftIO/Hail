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
            this.setState(this.state);
        });

        this.state.exchangeWalletData.addListener((wallets, changes) => {
            this.setState(this.state);

        });
    }

    _openWallet(walletID) {
        const {navigate} = this.props.navigation;
        navigate("WalletDetailsPage", {"walletID": walletID});
    }

    _newWallet() {
        const {navigate} = this.props.navigation;
        navigate("NewWalletPage");
    }

    _newWalletButton() {
        return (
            <Button 
                title={"New Wallet"}
                onPress={() => this._newWallet()}
            />
        );
    }

    _walletsList() {
        var sections = [
            {
                data: this.state.localWalletData,
                title: "Local Wallets",
                renderItem: (wallet) => 
                    <WalletElement
                        symbol={wallet.item.network}
                        aggregateCoins={0}
                        name={wallet.item.name}
                        aggregateValue={0}
                        percentageGrowth={0}
                        onPress={() => this._openWallet(wallet.item.walletID)}
                    />

                
            },
            {
                data: this.state.exchangeWalletData,
                title: "Exchange Wallets",
                renderItem: (wallet) => 
                    <WalletElement
                        symbol={wallet.item.symbol}
                        aggregateCoins={wallet.item.aggregateCoins}
                        name={wallet.item.name}
                        aggregateValue={wallet.item.aggregateValue}
                        percentageGrowth={wallet.item.percentageGrowth}
                        onPress={() => this._openWallet(wallet.item.walletID)}
                    />
            },
        ]

        return (
            <SectionList
                style={styles.list}
                renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title} </Text>}
                sections={sections}   
            />
        );
    }

    render() {
        return (
            <View style={styles.background}>
                {this._newWalletButton()}
                {this._walletsList()}
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
        //paddingTop: 70,
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