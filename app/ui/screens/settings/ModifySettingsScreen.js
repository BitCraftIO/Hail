// @flow
import React from 'react';
import { Colors } from '../Colors';
import { View, Text, StyleSheet } from 'react-native';
import settings from '../../../utils/Settings';
import Dropdown from './Dropdown';

export default class ModifySettingsScreen extends React.Component {

    _updateSettingsObject(key) {
        return function(itemValue, itemIndex) {
            settings[key] = itemValue;
        }
    }

    render() {
        const { navigation } = this.props;
        const settingsKey = navigation.getParam('settingsKey', '');
        const layoutData = layoutDataMap[settingsKey];

        const updateFunction = this._updateSettingsObject(settingsKey);

        return (
            <View style={styles.container}>
                <Text style={styles.labelText}>
                    {layoutData.label}
                </Text>
                <Dropdown 
                    selectedValue={settings[settingsKey]}
                    style={styles.dropdown}
                    pickerOptions={layoutData.dropdownOptions}
                    onValueChange={updateFunction}
                />
                <Text style={styles.descriptionText}>
                    {layoutData.description}
                </Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.PrimaryBackground,
        flex: 1,
    },
    labelText: {
        fontSize: 20,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 15,
        color: 'white',
        alignSelf: 'flex-start'
    },
    dropdown: {
        alignSelf: 'center',
        width: 300,
        height: 50,
    },
    descriptionText: {
        fontSize: 16,
        margin: 15,
        marginTop: 75,
        color: 'grey',
    }
})

/**
 * Page Schema:
 * 
 * EVERY LAYOUTDATA OBJECT SHOULD SHARE A KEY WITH THE SETTINGS OBJECT.
 * 
 * layoutDataMap is an object composed of 'layoutData' objects. Every
 * layoutData object should contain the following:
 * {
 *      label: <Page header>,
 *      dropdownOptions: [<Array of options to be fed to dropdown component>]
 *      description: <Informative text about the setting being changed>
 * }
 * 
 * The dropdownOptions value of the layoutData object is an array
 * of objects with the following format:
 * {
 *      label: <String displayed to user>,
 *      value: <Value stored in settings object>
 * }
 */
const layoutDataMap = {
    logLevel: {
        label: 'Log Level',
        dropdownOptions: [
            {label: "Error - Level 0", value: 0},
            {label: "Notify - Level 1", value: 1},
            {label: "Info - Level 2", value: 2}
        ],
        description: 'The log level determines the minimum importance of the logs you care to see. Higher level logs are less important.'
    }
}