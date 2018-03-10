// @flow

import React from 'react';
import ReactNative from 'react-native'
const {View, StyleSheet, Text} = ReactNative
import {IndicatorViewPager, PagerTitleIndicator} from "rn-viewpager"
import {Colors} from "../Colors";
import WalletsList from "../wallets/walletslist/WalletsListContainer";
import Watchlist from "../watchlist/state/WatchlistContainer";

export default class Home extends React.Component {

    static navigationOptions = {
        header: () => { }
    };

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
                            titles={["Watchlist", "Wallets"]}/>
                    }>
                    <View>
                        <Watchlist navigate={this.props.navigation.navigate}/>
                    </View>
                    <View>
                        <WalletsList navigation={this.props.navigation}/>
                    </View>
                </IndicatorViewPager>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },

    pagerContainer:{
        flex:1
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
        backgroundColor:"#fff",
        height:1,
        flex:1
    },
});