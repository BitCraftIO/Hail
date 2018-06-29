// @flow
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IndicatorViewPager } from 'rn-viewpager';
import WalletDetailPage from '../WalletDetailsPage'

export default class WalletPager extends React.Component {
    keyCounter = 0;

    constructor(props) {
        super(props);

        this._mapWalletToDetailPage = this._mapWalletToDetailPage.bind(this);
    }

    componentDidMount() {
        const initialIndex = this.props.navigation.getParam('initialIndex');

        this.viewPager.setPage(initialIndex);
    }

    _mapWalletToDetailPage(wallet) {
        const priceData = this.props.navigation.getParam('priceData');
        const { graphData, price } = priceData ? priceData[wallet.coin] : {};

        return (
            <View
                key={this.keyCounter++}
            >
                <WalletDetailPage
                    wallet={wallet}
                    navigation={this.props.navigation}
                    refresh={this.props.refresh}
                    graphData={graphData}
                    price={price}
                />
            </View>
        );
    }

    _extractComponentsFromWallets(wallets) {
        let localWallets = wallets.local;
        let exchangeWallets = wallets.exchange;

        // Map both arrays into WalletDetailComponents and concatinate into one
        let walletDetailsPageArray = localWallets.map(this._mapWalletToDetailPage);
        walletDetailsPageArray.concat(exchangeWallets.map(this._mapWalletToDetailPage));

        return walletDetailsPageArray;
    }

    render() {
        const { navigation } = this.props;
        const wallets = navigation.getParam('wallets');

        this.walletDetailsPageArray = this._extractComponentsFromWallets(wallets);

        return (
            <IndicatorViewPager
                style={styles.container}
                ref={(viewPager) => {this.viewPager = viewPager}}
            >
                {this.walletDetailsPageArray}
            </IndicatorViewPager>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})