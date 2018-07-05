// @flow

import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { Colors } from './Colors';
import WalletDashboard from "./wallets/dashboard/WalletDashboard";

export default class Home extends React.Component {
    componentDidMount() {
        Linking.addEventListener('url', this.navigate);
    }

    componentWillUnmount() {
        //TODO: Find out why this isn't solving the memory leak
        Linking.removeEventListener('url', this.navigate);
    }

    navigate = ({ url }) => {
        var route = url.split('?')[0].substring(7);

        // Extract url parameters into object params
        var params = url
            .split('?')[1]
            .split('&')
            .reduce((accum, item) => {
                let [key, value] = item.split('=');
                accum[key] = value;
                return accum;
            }, {});

        if (route === 'wallet/oauth/coinbase/') {
            this.props.navigation.navigate('CoinbaseSuccessPage', params);
            console.log(`Redirected with redirect_uri ${params}`);
        }
        if (route === 'wallet/oauth/coinbase/redirect/') {
            console.log(`Redirected with redirect_uri ${params}`);
        }
    }

    render() {
        const {shouldRefresh, toCreateWallet} = this.props.screenProps
        return (
            <View style={styles.container}>
                <WalletDashboard
                    navigation={this.props.navigation}
                    shouldRefresh={shouldRefresh}
                    toCreateWallet={toCreateWallet}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    pagerContainer: {
        flex: 1
    },

    indicatorContainer: {
        paddingTop: 30,
        height: 70,
        backgroundColor: Colors.SecondaryBackground
    },

    pagerTitleContainer: {
        marginLeft: 30
    },

    pagerTitleText: {
        fontSize: 20,
        color: Colors.SecondaryBackgroundFadedText
    },

    pagerSelectedTitleText: {
        fontSize: 20,
        color: Colors.SecondaryBackgroundText
    },

    pagerSelectedBorder: {
        backgroundColor: '#fff',
        height: 1,
        flex: 1
    }
});
