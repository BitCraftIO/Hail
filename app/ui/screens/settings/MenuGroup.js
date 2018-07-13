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
                secondaryText={button.secondaryText}
            />
        );
    }

    render() {
        const group = this.props.groupData

        return (
            <View style={styles.groupWrapper}>
                <Text style={styles.headerText}>
                    {group.groupTitle.toUpperCase()}
                </Text>
                <FlatList
                    data={group.selections}
                    keyExtractor={this._buttonKeyExtractor}
                    renderItem={({item}) => this._renderMenuButton(item)}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    groupWrapper: {
        justifyContent: 'flex-start',
        marginBottom: 30
    },
    headerText: {
        fontSize: 14,
        marginHorizontal: 20,
        marginTop: 15,
        color: Colors.PrimaryBackgroundText,
        fontWeight: 'bold',
        alignSelf: 'flex-start'
    },
})