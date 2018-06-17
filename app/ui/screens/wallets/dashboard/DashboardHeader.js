// @flow

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Colors } from "../../Colors";
import ImageButton from '../../../../components/ImageButton'
import Images from '../../../../utils/ImageLoader';

export default class DashboardHeader extends React.Component {



    render() {
        return(
            <View
                style={styles.bar}
            >
                <Text style={styles.hail}> hail </Text>
                <View
                    style={styles.floatingButtonContainer}
                >
                    <ImageButton
                        onPress={() => console.log("Tapp")}
                        source={Images.optionsHollow}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bar: {
        flex: 1,
        backgroundColor: Colors.SecondaryBackground,
        maxHeight: 45,
        alignItems: 'center'
    },
    hail: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'Ubuntu-MediumItalic',
    },
    floatingButtonContainer: {
        position: 'absolute',
        alignItems: 'flex-end',
        justifyContent: 'center',
        right: 0,
        top: 0,
        bottom: 0,
        left: 0,
    }
})