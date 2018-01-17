import React from 'react';
import {Header, SectionList, FlatList, StyleSheet, Text, View, TextInput, Button, Platform, NativeModules, StatusBar, Keyboard} from 'react-native';
import * as Db from "../../../../localstorage/db/Db";
import WalletElement from "./../components/WalletElement";
import * as actions from "../../../../localstorage/Actions";
import * as queries from "../../../../localstorage/Queries";


export default class WalletsList extends React.Component {

	static navigationOptions = {
        header: () => {}
    };

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.getWallets()
    }

    _openWallet(wallet) {
        const {navigate} = this.props.navigation;
        navigate("WalletDetailsPage", {"wallet": wallet});
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
                data: this.props.wallets.result.local,
                title: "Local Wallets",
                renderItem: (wallet) => 
                    <WalletElement
                        symbol={wallet.item.network}
                        aggregateCoins={0}
                        name={wallet.item.name}
                        aggregateValue={0}
                        percentageGrowth={0}
                        onPress={() => this._openWallet(wallet.item)}
                    />
            },
            {
                data: this.props.wallets.result.exchange,
                title: "Exchange Wallets",
                renderItem: (wallet) => 
                    <WalletElement
                        symbol={wallet.item.symbol}
                        aggregateCoins={wallet.item.aggregateCoins}
                        name={wallet.item.name}
                        aggregateValue={wallet.item.aggregateValue}
                        percentageGrowth={wallet.item.percentageGrowth}
                        onPress={() => this._openWallet(wallet.item)}
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
        // if (navigation.state.params.refresh) {
        //     this.props.getWallets()
        // }
        console.log(this.props.wallets.result)
        if (this.props.wallets.result) { //|| this.props.wallets.result.exchange || this.props.wallets.result.local) {
            var walletsList = this._walletsList();
        } else {
            var walletsList = null;
        }
        return (
            <View style={styles.background}>
                {this._newWalletButton()}
                {walletsList}
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