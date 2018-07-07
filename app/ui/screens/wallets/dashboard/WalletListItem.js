// @flow

import React, {Component} from 'react';
import ReactNative from "react-native"

const {View, Text, StyleSheet} = ReactNative
import Touchable from 'react-native-platform-touchable'
import type {WalletT} from "../../../../localstorage/db/models/Wallet";
import type { CoinGraphData } from '../../../../coin/CoinRequestGraphMapper';
import { getPercentageGrowthFromGraphData } from '../../../../coin/CoinRequestGraphMapper';

import { Colors } from "../../Colors";

type Props = {
    wallet: WalletT,
    graphData: CoinGraphData,
    price: number,
    onPress: any => {}
}

type State = {}

export default class WalletListItem extends Component<Props, State> {
    constructor() {
        super()
        this.state = {}
    }

    truncateName(text) {
        const MAX_CHARACTERS = 20;
        if (text.length > MAX_CHARACTERS) {
            return text.substring(0, MAX_CHARACTERS - 3) + '...';
        } else {
            return text;
        }
    }

    growthColor(percentageGrowth) {
        if (percentageGrowth > 0) {
            // Positive
            return Colors.PositiveGreen;
        } else if (percentageGrowth < 0) {
            // Negative
            return Colors.NegativeRed;
        } else {
            // Neutral
            return 'white';
        }
    }

    render() {
        const { wallet, onPress, price, graphData } = this.props
        let { name, value, coin } = wallet;
        
        // Rounds to 2 decimals
        let fiatValue = price ? (price * value).toFixed(2) : '--.--';
        let percentageGrowth = graphData ? getPercentageGrowthFromGraphData(graphData, 'day') : '-';
        
        name = this.truncateName(name);
        let growthColor = this.growthColor(percentageGrowth);

        return (
            <Touchable onPress={onPress}>
                <View style={styles.container}>

                    <View style={styles.lineWrapper}>
                        <View style={styles.decorativeLine} />

                        <View style={styles.infoContainer}>
                            <View style={styles.nameContainer}>
                                <Text style={styles.name}>{name}</Text>
                            </View>

                            <View style={styles.coinContainer}>
                                <Text style={styles.value}>{value}</Text>
                                <Text style={styles.coin}>{coin}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.valuesContainer}>
                        <View style={styles.fiatWrapper}>
                            <Text style={styles.dollarSign}>$</Text>
                            <Text style={styles.fiatValue}>{fiatValue}</Text>
                        </View>
                        <Text style={[styles.percentageGrowth, {color: growthColor}]}>
                            {percentageGrowth}%
                        </Text>
                    </View>
                </View>
            </Touchable>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: Colors.SecondaryBackground,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        // borderRadius: 5,
        // margin: 1,
    },

    infoContainer: {
        justifyContent: 'space-between'
    },

    coinContainer: {
        flexDirection: 'row',
    },

    coin: {
        fontFamily: 'Avenir',
        fontSize: 17,
        fontWeight: '700',
        color: Colors.PrimaryBackgroundText,
        paddingLeft: 5
    },

    value: {
        fontFamily: 'Avenir',
        fontSize: 17,
        color: 'white'
    },

    nameContainer: {
        
    },

    name: {
        fontFamily: 'Avenir',
        fontSize: 12,
        color: Colors.PrimaryBackgroundText,
    },

    valuesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingTop: 12,
        paddingLeft: 8
    },

    fiatWrapper: {
        flexDirection: 'row',
    },

    dollarSign: {
        fontFamily: 'Avenir',
        fontSize: 20,
        color: Colors.PrimaryBackgroundText,
        paddingRight: 1
    },

    fiatValue: {
        fontFamily: 'Avenir',
        fontSize: 20,
        color: 'white'
    },

    percentageGrowth: {
        paddingLeft: 14,
        fontFamily: 'Avenir',
        fontSize: 16,
        color: '#4ce0b3'
    },

    lineWrapper: {
        flexDirection: 'row',
        height: '100%',
        paddingVertical: '5%'
    },

    decorativeLine: {
        height: '95%',
        alignSelf: 'center',
        width: .5,
        backgroundColor: 'white',
        marginRight: 10
    }
})