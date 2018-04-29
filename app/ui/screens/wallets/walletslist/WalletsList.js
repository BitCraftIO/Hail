import React from 'react';
import { Header, SectionList, FlatList, StyleSheet, Text, View, TextInput, Button, Platform, NativeModules, StatusBar, Keyboard } from 'react-native';
import * as Db from 'hail/app/localstorage/db/Db';
import WalletElement from './../components/WalletElement';
import * as actions from 'hail/app/localstorage/db/utils/Actions';
import * as queries from 'hail/app/localstorage/db/utils/Queries';

import PropTypes from 'prop-types';
export default class WalletsList extends React.Component {
    static navigationOptions = {
        header: () => {}
    };

    static propTypes = {
        navigation: PropTypes.object.isRequired // must be instance of react-navigation
    };

    constructor(props) {
        super(props);
    }

    //TODO: Possible memory leak
    refresh = () => {
        console.log(this);
        this.props.getWallets();
    };

    componentDidMount() {
        this.props.getWallets();
    }

    componentWillMount() {
        this.props.getWallets();
    }

    openWallet(wallet) {
        const { navigate } = this.props.navigation;
        navigate('WalletDetailsPage', { wallet, refresh: this.refresh });
    }

    newWallet() {
        const { navigate } = this.props.navigation;
        navigate('NewWalletPage', { refresh: this.refresh });
    }

    newWalletButton() {
        return <Button title={'New Wallet'} onPress={() => this.newWallet()} />;
    }

    walletsList() {
        var sections = [
            {
                data: this.props.wallets.result.local,
                title: 'Local Wallets',
                renderItem: wallet => (
                    <WalletElement coin={wallet.item.coin} value={wallet.item.value} name={wallet.item.name} fiatValue={0} percentageGrowth={0} onPress={() => this.openWallet(wallet.item)} />
                )
            },

            //TODO: will probably need a seperate element for api
            {
                data: this.props.wallets.result.exchange,
                title: 'Exchange Wallets',
                renderItem: wallet => (
                    <WalletElement
                        coin={wallet.item.coin}
                        value={wallet.item.value}
                        name={wallet.item.name}
                        fiatValue={wallet.item.fiatValue}
                        percentageGrowth={wallet.item.percentageGrowth}
                        onPress={() => this.openWallet(wallet.item)}
                    />
                )
            }
        ];

        return <SectionList style={styles.list} renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title} </Text>} sections={sections} />;
    }

    loading() {}

    render() {
        if (this.props.wallets.result && !this.props.wallets.loading) {
            var walletsList = this.walletsList();
        } else if (this.props.wallets.loading) {
            return null;
        } else {
            var walletsList = null;
        }

        return (
            <View style={styles.background}>
                {this.newWalletButton()}
                {walletsList}
            </View>
        );
    }
}

styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#11151c'
    },
    list: {},
    sectionHeader: {
        fontFamily: 'Avenir',
        fontSize: 9,
        color: '#9b9b9b',
        paddingTop: 30,
        paddingBottom: 15
    },
    modal: {
        height: 230,
        backgroundColor: '#3B5998'
    }
});
