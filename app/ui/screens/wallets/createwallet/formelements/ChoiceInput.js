// @flow

import React, {Component} from 'react';
import ReactNative from "react-native"
const {View, Text, StyleSheet} = ReactNative
import Touchable from "react-native-platform-touchable"
import {Colors} from "../../../Colors";

type Props = {
    value: string,
    label: string,
    onSelect: string => void,
    isSelected: boolean
}

type State = { }

export default class ChoiceInput extends Component<Props, State>{
    render() {
        const {label, onSelect, value, isSelected} = this.props
        const bgColor = isSelected ? Colors.Green : "transparent"

        return (
            <Touchable style={styles.container} onPress={() => onSelect(value)}>
                <View style={[styles.contentContainer, {backgroundColor: bgColor}]}>
                    <Text style={styles.name}>{label}</Text>
                </View>
            </Touchable>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },

    contentContainer: {
        borderRadius: 4,
        borderColor: Colors.White,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 12,
        paddingBottom: 12,
    },

    name: {
        color: Colors.White,
        fontSize: 14,
        textAlign: "center"
    }
})