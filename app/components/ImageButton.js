// @flow
import React from 'react';
import { TouchableHighlight, Image, View, StyleSheet } from 'react-native';

type Props = {
    source?: any,
    style?: any, // To override width and height
    onPress?: () => void
}

export default class ImageButton extends React.Component {



    render() {
        return (
            <TouchableHighlight
                onPress={this.props.onPress}
                style={[styles.imageContainer, this.props.style]}
            >
                <Image
                    style={styles.image}
                    source={this.props.source}
                />
            </TouchableHighlight>
        );
    }

}

const styles = StyleSheet.create({
    imageContainer: {
        width: 23,
        height: 23,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    }
})