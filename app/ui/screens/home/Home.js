// @flow

import React from 'react';
import { View, StyleSheet, Linking, Text } from 'react-native';
import { IndicatorViewPager, PagerTitleIndicator } from 'rn-viewpager';
import WalletsList from '../wallets/walletslist/WalletsListContainer';
import Watchlist from '../watchlist/state/WatchlistContainer';
import { Colors } from '../Colors';

export default class Home extends React.Component {
    static navigationOptions = {
        header: () => {}
    };

    componentDidMount() {
        Linking.addEventListener('url', this.handleUrl);
    }

    componentWillUnmount() {
        //TODO: Find out why this isn't solving the memory leak
        Linking.removeEventListener('url', this.handleUrl);
    }

    handleUrl = ({ url }) => {
        this.navigate(url);
    };

    navigate(url) {
        var route = url.split('?')[0].substring(7);
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
        return (
            <View style={styles.container}>
                <IndicatorViewPager
                    style={styles.pagerContainer}
                    indicatorOnTop={true}
                    indicator={
                        <PagerTitleIndicator
                            style={styles.indicatorContainer}
                            itemStyle={styles.pagerTitleContainer}
                            selectedItemStyle={styles.pagerTitleContainer}
                            itemTextStyle={styles.pagerTitleText}
                            selectedItemTextStyle={styles.pagerSelectedTitleText}
                            selectedBorderStyle={styles.pagerSelectedBorder}
                            titles={['Watchlist', 'Wallets']}
                        />
                    }
                >
                    <View>
                        <Watchlist navigate={this.props.navigation.navigate} />
                    </View>
                    <View>
                        <WalletsList navigation={this.props.navigation} />
                    </View>
                </IndicatorViewPager>
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
