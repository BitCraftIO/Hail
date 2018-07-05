// @flow

import React, {Component} from 'react';
import ReactNative from "react-native"
const {View, Text, StyleSheet, ActivityIndicator} = ReactNative
import Touchable from "react-native-platform-touchable"
import {Colors} from "../../../Colors";
import NullableView from "../../../../NullableView";

type Props = {
    text: string,
    isLoading: boolean,
    onPress: void => void,
    containerStyle?: any
}

type State = {}

export default class Button extends Component<Props, State>{
    render() {
        const { text, onPress, containerStyle, isLoading } = this.props
        return (
            <Touchable
                style={[styles.rootContainer, containerStyle]}
                disabled={isLoading}
                onPress={onPress}>
                <View style={styles.container}>
                    <Text style={styles.text}>{text}</Text>
                    <NullableView isShowing={isLoading}>
                        <ActivityIndicator style={styles.indicator} />
                    </NullableView>
                </View>
            </Touchable>
        )
    }
}

const styles = StyleSheet.create({
    rootContainer: {
        width: 100,
    },

    container: {
        backgroundColor: Colors.Green,
        flexDirection: "row",
        borderRadius: 4,
        paddingTop: 8,
        paddingBottom: 8,
        justifyContent: "center"
    },

    text: {
        color: Colors.White,
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center"
    },

    indicator: {
        marginLeft: 4
    }
})