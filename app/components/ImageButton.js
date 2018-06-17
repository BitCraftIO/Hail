// @flow
import React from 'react';
import { TouchableHighlight, Image, View, StyleSheet } from 'react-native';

type Props = {
    pngSource?: any,
    svgSource?: any,
    onPress?: () => void
}

export default class ImageButton extends React.Component {



    render() {
        return (
            <TouchableHighlight
                onPress={this.props.onPress}
                style={this.style}
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
        flex: 1,
    },
    image: {
        // flex: 1,
        // width: 100,
        resizeMode: 'center'
    }
})