// @flow

import React from 'react';
import { View, Platform, StyleSheet, Text } from 'react-native';
import { Colors } from "../../Colors";

export default class DashboardHeader extends React.Component {

    render() {
        return(
            <View
                style={styles.bar}
            >
                <Text style={styles.hail}> hail </Text>
                <View
                    style={styles.floatingButtonContainer}
                >
                    {this.props.children}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bar: {
        flex: 1,
        backgroundColor: Colors.SecondaryBackground,
        maxHeight: Platform.OS === 'ios' ? 60 : 45,
        justifyContent: Platform.OS === 'ios' ? 'center' : 'flex-start',
        alignItems: 'center',
    },
    hail: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'Ubuntu-MediumItalic',
    },
    floatingButtonContainer: {
        flexDirection: 'row',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'flex-end',
        right: 0,
        top: 0,
        bottom: 0,
        left: 0,
        paddingRight: 15,
    }
})