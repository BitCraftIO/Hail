// @flow
import React from 'react';
import { Colors } from '../Colors';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';

type Props = {
    imgSource?: any,
    label: string,
    onPress?: () => void,
    secondaryText?: string
}

export default class MenuButton extends React.Component {

    _dynamicMargin() {
        return {
            marginLeft: this.props.imgSource ? '15%' : 5
        }
    }

    render() {
        return (
            <TouchableHighlight
                underlayColor="rgba(0, 0, 0, .2)"
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
                    <View style={styles.textWrapper}>
                        <View />
                        <View style={styles.textContainer}>
                            <Text style={styles.buttonText}>
                                {this.props.label}
                            </Text>
                            <Text style={styles.buttonText}>
                                {this.props.secondaryText}
                            </Text>
                        </View>
                        <View style={styles.seperatorLine} />
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

}

const styles = StyleSheet.create({
    button: {
        height: 80,
        flexDirection: 'row',
        paddingRight: 15
    },
    textWrapper: {
        alignSelf: 'flex-start',
        justifyContent: 'space-between',
        marginHorizontal: 5,
        height: '100%',
        flex: 1,
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 14,
        color: 'white',
        alignSelf: 'flex-start',
    },
    seperatorLine: {
        backgroundColor: Colors.PrimaryBackgroundText,
        height: 1,
        width: '100%',
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '17%'
    },
    image: {
        height: '50%',
        width: 24,
    },
})