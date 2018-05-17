// @flow
import React from 'react';
import { View, Text, StyleSheet, FlatList, Picker} from 'react-native';
import { Colors } from '../Colors';
import Logger from '../../../utils/Logger';

const filename = 'Dropdown.js';
let logger = new Logger(filename);

export default class Dropdown extends React.Component {
    
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.text}>Test</Text>
                </View>
                <View style={styles.underline} />
                <FlatList
                    style={styles.flatlist}
                    ItemSeparatorComponent={<View style={styles.separator} />}
                    data={[{key: 'a', val: "TEST"}, {key: 'b', val: "TEST2"}, {key: 'c', val: "TEST"}, {key: 'd', val: "TEST"},]}
                    renderItem={({item}) => <Text style={styles.text}>{item.val}</Text>} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
    },
    content: {
        flex: 10
    },
    text: {
        color: 'white',
        alignSelf: 'center'
    },
    underline: {
        flex: 1,
        backgroundColor: 'white'
    },
    flatlist: {
        top: 50,
        width: 200,
        height: 50,
        position: 'absolute',
        backgroundColor: 'grey'
    },
    separator: {
        height: 2,
        color: 'black'
    }
})