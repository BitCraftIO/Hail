import React from 'react';
import {FlatList, StyleSheet, Text, View, TextInput, Button, Platform, NativeModules, StatusBar, Keyboard} from 'react-native';
import WalletElement from "./WalletElement.js"

export default class WalletsList extends React.Component {

    walletDATA = [
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
            name: "Public Wallet",
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
            "walletData": this.walletDATA,
            "exchangeWallets": false,
            "exchangeData":[]
        };
    }

    openWallet = (walletID) => {
        const {navigate} = this.props.navigation;
        navigate("WalletDetailsPage", {"walletID": walletID});
    }

    render() {
        return (
            <View style={styles.background}>
                <FlatList
                    style={styles.list}
                    data={this.state.walletData}
                    renderItem={(wallet) => 
                        
                        <WalletElement 
                            symbol={wallet.item.symbol} 
                            aggregateCoins={wallet.item.aggregateCoins}
                            name={wallet.item.name}
                            aggregateValue={wallet.item.aggregateValue}
                            percentageGrowth={wallet.item.percentageGrowth}
                            onPress={() => this.openWallet(wallet.item.walletID)}
                        />
                        
                    
                    }
                />
            </View>
        );
    };
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#11151c',
        alignItems: 'center',
    },
    list: {
        paddingTop: 100,
    }
});