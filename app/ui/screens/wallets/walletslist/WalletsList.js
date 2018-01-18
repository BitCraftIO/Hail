import React from 'react';
import {Header, SectionList, FlatList, StyleSheet, Text, View, TextInput, Button, Platform, NativeModules, StatusBar, Keyboard} from 'react-native';
import * as Db from "hail/app/localstorage/db/Db";
import WalletElement from "./../components/WalletElement";
import * as actions from "hail/app/ui/screens/wallets/utils/Actions";
import * as queries from "hail/app/ui/screens/wallets/utils/Queries";


export default class WalletsList extends React.Component {

	static navigationOptions = {
        header: () => {}
    };

    constructor(props) {
        super(props);
    }

    //TODO: Possible memory leak
    refresh = () => {
        console.log(this);
        this.props.getWallets()
    }

    componentDidMount(){
        this.props.getWallets()
    }

    componentWillMount(){
        this.props.getWallets()
    }

    openWallet(wallet) {
        const {navigate} = this.props.navigation;
        navigate("WalletDetailsPage", {"wallet": wallet, refresh: this.refresh});
    }

    newWallet() {
        const {navigate} = this.props.navigation;
        navigate("NewWalletPage", {refresh: this.refresh});
    }

    newWalletButton() {
        return (
            <Button 
                title={"New Wallet"}
                onPress={() => this.newWallet()}
            />
        );
    }

    walletsList() {
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
                        onPress={() => this.openWallet(wallet.item)}
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
                        onPress={() => this.openWallet(wallet.item)}
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

    loading() {
        
    }

    render() {
        if (this.props.wallets.result && !this.props.wallets.loading) {
            var walletsList = this.walletsList();
        } 
        else if (this.props.wallets.loading) {
            return null;
        }
        else {
            var walletsList = null;
        }

        return (
            <View style={styles.background}>
                {this.newWalletButton()}
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