// @flow

import React, {Component} from 'react';
import ReactNative from "react-native"
const {View, Text, StyleSheet} = ReactNative
import Touchable from "react-native-platform-touchable"
import {Colors} from "../../../Colors";

type Props = {
    text: string,
    onPress: void => void,
    style?: any
}

type State = {}

export default class Button extends Component<Props, State>{
    render() {
        const { text, onPress, style } = this.props
        return (
            <Touchable style={styles.rootContainer} onPress={onPress}>
                <View style={[styles.container, style]}>
                    <Text style={styles.text}>{text}</Text>
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
        borderRadius: 4,
        paddingTop: 8,
        paddingBottom: 8
    },

    text: {
        color: Colors.White,
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center"
    }
})