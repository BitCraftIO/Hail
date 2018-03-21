import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { IndicatorViewPager, PagerTitleIndicator } from 'rn-viewpager';
import WalletsList from '../wallets/walletslist/WalletsListContainer';
import Watchlist from '../watchlist/state/WatchlistContainer';

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
            <View style={{ flex: 1 }}>
                <IndicatorViewPager
                    indicatorOnTop={true}
                    style={{ flex: 1, backgroundColor: 'white' }}
                    indicator={<PagerTitleIndicator itemStyle={styles.tabIndicator} selectedItemStyle={styles.tabIndicator} titles={['Watchlist', 'Wallets']} />}
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
    tabIndicator: {
        flex: 1
    }
});
