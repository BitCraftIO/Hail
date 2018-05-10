var EthereumSync = require('./EthereumSync.js');
var BitcoinSync = require('./BitcoinSync.js');

const syncModules = {
    BTC: BitcoinSync,
    ETH: EthereumSync
};

import { countWallets, collectAddresses } from 'hail/app/localstorage/db/utils/Queries';

export default class SyncManager {
    runningTasks = [];
    addresses = collectAddresses();

    start() {
        setupBackgroundTasks();
    }

    setupBackgroundTasks() {
        //start sync for coins
        const countedWallets = countWallets();
        for (key in countedWallets) {
            //NOTE: Does countedWallets ever have a key with value 0?
            if (countedWallets[key] > 0) {
                const task = new syncModules[key](addresses[key]);
                task.setup(); //key is the coin characteristic in wallet schema
                runningTasks.push(task);
            }
        }
    }

    stop() {}
}
