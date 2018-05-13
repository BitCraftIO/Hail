// @flow

import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Colors } from '../Colors';
import Logger from '../../../utils/Logger'
import * as loggerActions from 'hail/app/localstorage/db/utils/LoggerActions';
import moment from 'moment';

const filename = 'LogPage.js';
let logger = new Logger(filename);

export default class LogPage extends React.Component {
    /**
     * date
     * logLevel
     * message
     */

    logsList = [];

    levelToColorMap = {
        0: 'red',
        1: 'aquamarine',
        2: 'grey'
    }

    componentDidMount() {
        this.getLogs();
    }

    getLogs() {
        let queriedLogs = loggerActions.getLogs();

        // Invert to display with most recent first
        for (let i = queriedLogs.length - 1; i >= 0; i--) {
            this.logsList.push(queriedLogs[i]);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.flatList}
                    contentContainerStyle={styles.flatListContentContainer}
                    data={this.logsList}
                    keyExtractor={(item, index) => index}
                    renderItem={({item, separators}) => (
                        <View style={styles.logItem}>
                            <Text style={{color: this.levelToColorMap[item.logLevel]}}>{logger.levelMap[item.logLevel] + ' - Level ' + item.logLevel}</Text>
                            <Text style={styles.logText}>{item.message}</Text>
                            <Text style={styles.logText}>{moment(item.date).format('MMM D, h:m:ssa')}</Text>
                        </View>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.PrimaryBackground,
        flex: 1,
        justifyContent: 'center'
    },

    flatList: {
        flex: 1,
    },

    flatListContentContainer: {
        justifyContent: 'center'
    },

    logItem: {
        backgroundColor: Colors.SecondaryBackground,
        borderRadius: 5,
        marginHorizontal: 10,
        marginTop: 10,
        minHeight: 75,
        flex: 1,
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingVertical: 5,
    },

    logText: {
        color: 'white'
    }
});
