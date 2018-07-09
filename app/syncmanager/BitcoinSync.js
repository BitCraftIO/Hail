import BackgroundTask from 'react-native-background-task';
import queueFactory from 'react-native-queue';

export default class BitcoinSync {
    constructor(addresses, testnet) {
        this.addresses = addresses;
        this.testnet = testnet;
    }

    setup() {
        BackgroundTask.define();
    }

    start() {}

    job() {}
}
