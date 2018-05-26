// @flow

import React, {Component} from 'react';
import ReactNative from "react-native"
const {View, Text, StyleSheet} = ReactNative

type Props = {
    label: string,
    placeHolder: string,
    elementType: Component,
    errorMessage?: string
}

type State = {}

export default class FormElement extends Component<Props, State>{
    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>FormElement Page!</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {

    }
})