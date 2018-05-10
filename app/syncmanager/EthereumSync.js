import BackgroundTask from 'react-native-background-task';
import queueFactory from 'react-native-queue';

export default class EthereumSync {
    constructor(addresses) {
        this.addresses = addresses;
    }

    setup() {
        BackgroundTask.define([
            'require',
            'dependency'
        ], function(require, factory) {
            'use strict';
            
        });
    }

    start() {}

    job() {

    }
}
