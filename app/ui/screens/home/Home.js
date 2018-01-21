import React from 'react';
import {View, StyleSheet} from 'react-native';
import {IndicatorViewPager, PagerTitleIndicator} from "rn-viewpager"
import WalletsList from "../wallets/walletslist/WalletsListContainer";
import Watchlist from "../watchlist/state/WatchlistContainer";

export default class Home extends React.Component {

    static navigationOptions = {
        header: () => { }
    };

    render() {
        return (
            <View style={{flex:1}}>
                <IndicatorViewPager
                    indicatorOnTop={true}
                    style={{flex:1, backgroundColor:'white'}}
                    indicator={
                        <PagerTitleIndicator
                            itemStyle={styles.tabIndicator}
                            selectedItemStyle={styles.tabIndicator}
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
    tabIndicator: {
        flex:1
    }
});