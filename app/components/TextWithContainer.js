// @flow

import React, {Component} from 'react';
import ReactNative from "react-native"
const {View, Text} = ReactNative

type Props = {
    text: string,
    textStyle: Object,
    containerStyle: Object
}

type State = {}

export default class TextWithContainer extends Component<Props, State> {
    render() {
        const { textStyle, containerStyle, text } = this.props
        return (
            <View style={containerStyle}>
                <Text style={textStyle}>
                    No {text} Found.
                </Text>
            </View>
        )
    }
}