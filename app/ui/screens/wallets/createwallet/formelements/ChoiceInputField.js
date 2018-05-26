// @flow

import React, {Component} from 'react';
import ReactNative from "react-native"
import ChoiceInput from "./ChoiceInput";

const {View, Text, StyleSheet} = ReactNative

type Props = {
    choices: {}, // label => value
    label: string,
    labelColor: string,
    onSelect: any => void,
    style?: any
}

type State = {
    selectedValue: any
}

export default class ChoiceInputField extends Component<Props, State> {
    constructor(props) {
        super(props)
        const {choices} = this.props

        this.state = {
            selectedValue: choices[Object.keys(choices)[0]]
        }
    }

    onSelect(selectedValue) {
        const {onSelect} = this.props
        this.setState(
            {selectedValue},
            () => { onSelect(selectedValue) }
        )
    }

    assembleChoiceViews() {
        const { choices } = this.props
        const { selectedValue } = this.state

        return Object.keys(choices)
            .map(label => <ChoiceInput
                            isSelected={choices[label] === selectedValue}
                            key={Math.random()}
                            onSelect={this.onSelect.bind(this)}
                            value={choices[label]}
                            label={label} />
            )
    }

    render() {
        const {label, style, labelColor} = this.props
        const choiceViews = this.assembleChoiceViews()

        return (
            <View style={[styles.container, style]}>
                <Text style={[styles.label, {color: labelColor}]}>
                    {label}
                </Text>
                <View style={styles.choiceContainer}>
                    {choiceViews}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {},

    choiceContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    label: {
        fontSize: 11,
        marginBottom: 8,
        fontWeight: "600"
    },
})