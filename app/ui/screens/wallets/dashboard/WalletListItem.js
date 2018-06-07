// @flow

import React, {Component} from 'react';
import ReactNative from "react-native"

const {View, Text, StyleSheet} = ReactNative
import Touchable from 'react-native-platform-touchable'
import type {WalletT} from "../../../../localstorage/db/models/Wallet";

type Props = {
    wallet: WalletT,
    onPress: any => {}
}

type State = {}

export default class WalletListItem extends Component<Props, State> {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        const { wallet, onPress } = this.props

        return (
            <Touchable
                onPress={onPress}
                style={styles.container}>
                <View>
                    <View style={styles.infoContainer}>
                        <View>
                            <Text style={styles.coin}>{wallet.coin}</Text>
                            <Text style={styles.value}>{wallet.value}</Text>
                        </View>

                        <View style={styles.nameContainer}>
                            <Text style={styles.name}>{wallet.name}</Text>
                        </View>
                    </View>

                    <View style={styles.valuesContainer}>
                        <Text style={styles.fiatValue}>{wallet.fiatValue}</Text>
                        <Text style={styles.percentageGrowth}>{wallet.percentageGrowth}</Text>
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
        backgroundColor: '#212d40',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    coin: {
        fontFamily: 'Avenir',
        fontSize: 17,
        fontWeight: '900',
        color: '#ffffff'
    },

    value: {
        fontFamily: 'Avenir',
        fontSize: 12,
        color: '#ffffff'
    },

    nameContainer: {
        paddingLeft: 20,
        paddingRight: 20
    },

    name: {
        fontFamily: 'Avenir',
        fontSize: 13,
        color: '#ffffff'
    },

    valuesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 8
    },

    fiatValue: {
        fontFamily: 'Avenir',
        fontSize: 24,
        paddingTop: 12,
        color: '#ffffff'
    },

    percentageGrowth: {
        paddingLeft: 14,
        paddingTop: 24,
        fontFamily: 'Avenir',
        fontSize: 11.3,
        color: '#4ce0b3'
    }
})