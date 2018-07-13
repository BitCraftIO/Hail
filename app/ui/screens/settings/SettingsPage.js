// @flow
import React from 'react';
import { Colors } from '../Colors';
import { View, Text, StyleSheet, FlatList, Picker, Image, TouchableHighlight } from 'react-native';
import logger from '../../../utils/Logger';
import settings from '../../../utils/Settings';
import MenuButton from './MenuButton'
import MenuGroup from './MenuGroup'
import ImageButton from '../../../components/ImageButton'
import Images from '../../../utils/ImageLoader';

export default class SettingsPage extends React.Component {

    /**
     * Page Schmea:
     * layoutMap is an array of 'group' objects. Every grooup
     * should contain the following:
     * {
     *      groupTitle: <Label of group to be displayed>,
     *      selections: [<Array of data populating menu buttons>]
     * }
     * 
     * The selections value of the group object is an array
     * of 'button' objects. Buttons should contain the following:
     * {
     *      imgSource: <Optional image source displayed on left side of button>,
     *      label: <String displayed on the button>,
     *      onPress: <Function called when button is tapped>
     * }
     */
    layoutMap = [
        {
            groupTitle: "General",
            selections: [
                {
                    imgSource: Images.searchIcon,
                    label: "Logs",
                    onPress: this._navigateToModifySettingsPage('logLevel').bind(this)
                },
                {
                    imgSource: Images.searchIcon,
                    label: "Logs",
                    onPress: this._navigateToModifySettingsPage('logLevel').bind(this)
                },
            ],
        },
        {
            groupTitle: "Sync",
            selections: [
                {
                    imgSource: Images.searchIcon,
                    label: "Logs",
                    onPress: this._navigateToModifySettingsPage('logLevel').bind(this)
                },
                {
                    imgSource: Images.searchIcon,
                    label: "Logs",
                    onPress: this._navigateToModifySettingsPage('logLevel').bind(this)
                },
                {
                    imgSource: Images.searchIcon,
                    label: "Logs",
                    onPress: this._navigateToModifySettingsPage('logLevel').bind(this)
                },
            ],
        },
    ]

    /**
     * Navigates to the ModifySettingsScreen and populates the page
     * using data stored in ModifySettingsScreen.js and accessed by
     * the passed in key value
     * @param {string} key should match a key on the settings object.
     *      Used to populate data and modify thee settings object.
     */
    _navigateToModifySettingsPage(key) {
        return function() {
            const { navigate } = this.props.navigation;

            navigate("ModifySettingsScreen", {
                settingsKey: key
            })
        }
    }

    goBack() {
        const { navigation } = this.props;
        navigation.goBack();
    }

    _groupKeyExtractor(item, index) {
        return item.groupTitle;
    };

    _renderGroup(group) {
        return (
            <MenuGroup
                groupData={group}
            />
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.imageContainer}>
                        <ImageButton
                            onPress={this.goBack.bind(this)}
                            source={Images.arrowLeft}
                        />
                    </View>

                    <Text style={styles.headerText}>Settings</Text>
                </View>

                <FlatList
                    style={styles.flatlist}
                    data={this.layoutMap}
                    keyExtractor={this._groupKeyExtractor}
                    renderItem={({item}) => this._renderGroup(item)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.SecondaryBackground,
        alignItems: 'center',
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: 60,
    },
    headerText: {
        color: 'white',
        fontSize: 22,
        marginLeft: '15%'
    },
    imageContainer: {
        justifyContent: 'center',
        marginLeft: 15,
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
    },
    flatlist: {
        width: '100%'
    },
})