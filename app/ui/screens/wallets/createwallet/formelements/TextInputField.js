// @flow

import React, {Component} from 'react';
import ReactNative from "react-native"
import {Colors} from "../../../Colors";
const {View, Text, StyleSheet, TextInput} = ReactNative

type Props = {
    label: string,
    placeHolder: string,
    onTextChange: string => void,
    errorMessage?: string,
    textColor?: string,
    style?: any
}

type State = {
    input: string
}

export default class TextInputField extends Component<Props, State>{
    constructor(props: Props) {
        super(props)
        this.state = {
            input: ""
        }
    }

    onTextChange(input) {
        this.setState({input})
        this.props.onTextChange(input)
    }

    render() {
        const {label, errorMessage, style, textColor, placeholder} = this.props

        return (
            <View style={[styles.container, style]}>
                <Text style={[styles.label, {color: textColor}]}>
                    {label}
                </Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={this.onTextChange.bind(this)}
                    underlineColorAndroid={Colors.White}
                    autoCapitalize={"words"}
                    placeHolder={placeholder}
                    placeHolderTextcolor={Colors.White}
                />
                <Text style={styles.error}>
                    {errorMessage}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {

    },

    label:{
        fontSize: 11,
        marginBottom: 8,
        fontWeight: "600"
    },

    textInput: {
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 12,
        paddingRight: 12,
        height: 40,
        borderColor: Colors.White,
        fontSize: 15,
        color: Colors.White,
        borderWidth: .5
    },

    error: {

    }
})