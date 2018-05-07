// @flow

import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Colors } from '../Colors';
import Logger from '../../../utils/Logger'
import * as dbActions from 'hail/app/localstorage/db/utils/Actions';
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
        let testList = [
            {
                key: '0',
                date: '2018-05-07T01:56:52.278Z',
                logLevel: 2,
                message: "Test Message"
            },
            {
                key: '1',
                date: '2018-05-07T01:56:52.278Z',
                logLevel: 1,
                message: "Test MessageTest MessageTest MessageTest MessageTest MessageTest MessageTest MessageTest MessageTest MessageTest MessageTest MessageTest MessageTest MessageTest Message"
            },
            {
                key: '2',
                date: '2018-05-07T01:56:52.278Z',
                logLevel: 0,
                message: "Test Message"
            },
            {
                key: '0',
                date: '2018-05-07T01:56:52.278Z',
                logLevel: 2,
                message: "Test Message"
            },
            {
                key: '1',
                date: '2018-05-07T01:56:52.278Z',
                logLevel: 1,
                message: "Test MessageTest MessageTest MessageTest MessageTest MessageTest MessageTest MessageTest MessageTest MessageTest MessageTest MessageTest MessageTest MessageTest Message"
            },
            {
                key: '2',
                date: '2018-05-07T01:56:52.278Z',
                logLevel: 0,
                message: "Test Message"
            },
            {
                key: '0',
                date: '2018-05-07T01:56:52.278Z',
                logLevel: 2,
                message: "Test Message"
            },
            {
                key: '1',
                date: '2018-05-07T01:56:52.278Z',
                logLevel: 1,
                message: "Test MessageTest MessageTest MessageTest MessageTest MessageTest MessageTest MessageTest MessageTest MessageTest MessageTest MessageTest MessageTest MessageTest Message"
            },
            {
                key: '2',
                date: '2018-05-07T01:56:52.278Z',
                logLevel: 0,
                message: "Test Message"
            },
            
        ];

        for (let i = 0; i < testList.length; i++) {
            this.logsList.push(testList[i]);
        }

        // let queriedLogs = dbActions.getLogs();
        // console.log(queriedLogs[0]);

        // for (let i = 0; i < queriedLogs.length && i < 100; i++) {
        //     this.logsList.push(queriedLogs[i]);
        // }
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.flatList}
                    contentContainerStyle={styles.flatListContentContainer}
                    data={this.logsList}
                    renderItem={({item, separators}) => (
                        <View style={styles.logItem}>
                            <Text style={{color: this.levelToColorMap[item.logLevel]}}>{logger.levelMap[item.logLevel] + ' - Level ' + item.logLevel}</Text>
                            <Text style={styles.logText}>{item.message}</Text>
                            <Text style={styles.logText}>{moment(item.date).format('MMM D, h:m:sa')}</Text>
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
        paddingTop: 5
    },

    flatListContentContainer: {
        justifyContent: 'center'
    },

    logItem: {
        backgroundColor: Colors.SecondaryBackground,
        borderRadius: 5,
        margin: 10,
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
