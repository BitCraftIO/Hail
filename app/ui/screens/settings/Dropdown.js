// @flow
import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, TouchableWithoutFeedback, Image, Modal } from 'react-native';
import { Select, Option } from 'react-native-chooser';

export default class Dropdown extends React.Component {

    /**
     * Flatlist will take in options
     * Text will take in current selection
     * on tap flatlist change current selection
     * configurable width, height
     */

    static propTypes = {
        containerStyle: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.number,
            PropTypes.shape({}),
        ]).isRequired
    }
    
    render() {
        const { containerStyle } = this.props;

        return(
            <View style={containerStyle}>
                <Select 
                    style={styles.content}
                    defaultText={''}
                    optionListStyle={styles.optionListStyle}
                    textStyle={styles.text}
                    transparent={true}
                >
                    <Option value={'text'}>Test</Option>
                    <Option value={'text2'}>Test2</Option>
                    <Option value={'text'}>Test</Option>
                    <Option value={'text2'}>Test2</Option>
                </Select>

                <View style={styles.imageContainer}>
                    <Image
                        style={styles.chevron}
                        resizeMode='contain'
                        source={require('../../../images/chevron_down.png')}
                    />
                </View>
                <View style={styles.underline} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    chevron: {
        width: 24,
        height: '50%',
        margin: 5,
        alignSelf: 'flex-end'
    },
    content: {
        height: '95%',
        borderWidth: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontSize: 18,
        paddingTop: 5,
        alignSelf: 'center',
    },
    underline: {
        height: '5%',
        backgroundColor: 'white'
    },
    optionListStyle: {
        position: 'absolute',
        backgroundColor: 'white',
    }
})