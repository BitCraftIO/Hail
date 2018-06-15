// @flow
import React from 'react';
import { Colors } from '../Colors';
import { View, Text, StyleSheet, Image, FlatList, TouchableHighlight } from 'react-native';
import MenuButton from './MenuButton';
import Images from '../../../utils/ImageLoader';

export default class MenuGroup extends React.Component {

    _buttonKeyExtractor(item, index) {
        return index;
    }

    _renderMenuButton(button) {
        return (
            <MenuButton 
                imgSource={button.imgSource}
                label={button.label}
                onPress={button.onPress}
            />
        );
    }

    _renderSeparator() {
        return (
            <View style={styles.separator} />
        );
    }

    render() {
        const group = this.props.groupData

        return (
            <View style={styles.groupWrapper}>
                <Text style={styles.headerText}>
                    {group.groupTitle}
                </Text>
                <FlatList
                    data={group.selections}
                    keyExtractor={this._buttonKeyExtractor}
                    renderItem={({item}) => this._renderMenuButton(item)}
                    ItemSeparatorComponent={this._renderSeparator}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    groupWrapper: {
        justifyContent: 'flex-start',
        margin: 10
    },
    headerText: {
        fontSize: 20,
        margin: 5,
        color: 'white',
        alignSelf: 'flex-start'
    },
    separator: {
        width: '100%',
        height: 2,
        backgroundColor: Colors.PrimaryBackground
    },
})