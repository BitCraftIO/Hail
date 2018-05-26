// @flow

import React, {Component} from 'react';
import ReactNative from "react-native"
const {View, Text, StyleSheet} = ReactNative

type Props = {}

type State = {}

export default class FormProgressIndicator extends Component<Props, State>{
    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>FormProgressIndicator Page!</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {

    }
})