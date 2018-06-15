// @flow
import React from 'react';
import { Colors } from '../Colors';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';

type Props = {
    imgSource?: any,
    label: string,
    onPress?: () => void
}

export default class MenuButton extends React.Component {

    _dynamicMargin() {
        return {
            marginLeft: this.props.imgSource ? '10%' : 5
        }
    }

    render() {
        return (
            <TouchableHighlight
                underlayColor="rgba(255, 255, 255, .7)"
                onPress={this.props.onPress}
            >
                <View
                    style={styles.button}
                >
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            resizeMode='contain'
                            source={this.props.imgSource}
                        />
                    </View>
                    <Text
                        style={[styles.buttonText, this._dynamicMargin()]}
                    >
                        {this.props.label}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }

}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.SecondaryBackground,
        padding: 5,
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'flex-start',
        marginLeft: 5,
    },
    imageContainer: {
        padding: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
    },
    image: {
        alignSelf: 'flex-start',
        height: '50%',
        margin: 5,
        width: 24,
    },
})