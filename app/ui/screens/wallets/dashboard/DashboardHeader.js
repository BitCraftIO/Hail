import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Colors } from "../../Colors";

export default class DashboardHeader extends React.Component {

    render() {
        return(
            <View
                style={styles.bar}
            >
                <Text style={styles.hail}> hail </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bar: {
        flex: 1,
        backgroundColor: Colors.SecondaryBackground,
        maxHeight: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    hail: {
        color: 'white',
        fontSize: 28,
        fontFamily: 'Ubuntu-MediumItalic',
    }
})