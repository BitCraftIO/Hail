// @flow
import React from 'react';
import { View, Text, StyleSheet, Picker} from 'react-native';
import { Colors } from '../Colors';
import Logger from '../../../utils/Logger';

const filename = 'SettingsPage.js';
let logger = new Logger(filename);

export default class SettingsPage extends React.Component {

    /** Notes:
     * Custom Dropdown
     * Loop through settings[key] to verify options[key] exists | display warning
     * onValueChange: set settings value
     * Need custom picker
     * typeCheck for non dropdowns
     * * Camelcase to word for default label
     * * Default option: 'Default', ''
     */

    settingsOptionsMap = {
        logLevel: {
            label: "Log Level",
            options: [
                { label: "Value", value: "Label" },
                { label: "Va2lue", value: "Label" }
            ]
        }
    }

    render() {
        let numbers = [1, 2, 3, 4, 5, 6];
        let pickerRows = numbers.map((number) => <Picker.Item key={number.toString()} label={"Java " + number} value="test" />)
        console.log(pickerRows)

        return(
            <View style={styles.container}>
                <Picker
                    style={styles.picker}>
                    {pickerRows}
                </Picker>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.PrimaryBackground,
        flex: 1
    },

    picker: {
        color: 'white',
        height: 50,
        borderWidth: 2,
        borderColor: 'white'
    }
})