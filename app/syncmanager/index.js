import EthereumSync from './EthereumSync';
import BitcoinSync from './BitcoinSync';
import * as Db from '../localstorage/db/Db';

const syncModules = {
    BTC: BitcoinSync,
    ETH: EthereumSync
};

import { countWallets, collectAddresses } from 'hail/app/localstorage/db/utils/Queries';

export default class SyncManager {
    constructor() {
        this.addresses = collectAddresses();
        this.runningTasks = [];
        this.setupDbListeners();
        this.syncPeriod = 900000;
        this.startLiveSyncing();
    }

    /**
     * To run only when app is on
     */
    startLiveSyncing() {
        for (coin in this.addresses) {
            for (network in this.addresses[coin]) {
                const task = new syncModules[coin](addresses[coin][network]);
                runningTasks.push(task);
                task.start();
            }
        }
    }
    start() {
        //setupBackgroundTasks();
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
    setupDbListeners() {
        //Updates this.addresses when new address`es are added
        Db.query('Wallet').addListener((wallet, changes) => {
            const insertAddresses = index => {
                const w = wallet[index];
                addresses[w.coin][w.network].push(w.addresses);
            };

            changes.insertions.forEach(insertAddresses);

            changes.modifications.forEach(insertAddresses);
        });

        Db.query('Configuration').addListener((config, changes) => {
            changes.modifications.forEach(_ => {
                if (config.stopSyncing) {
                    this.stop();
                }

                if (config.dumpSyncMemory) {
                    this.dumpSyncMemory();
                }

                this.syncPeriod = config.syncPeriod;
            });
        });
    }

    dumpSyncMemory() {}

    stop() {}
}

/*
This needs to: (all on a seperate thread from UI)
* begin syncing all wallets
* Set up background sync tasks (if not set up)
* monitor for new wallets and/or addresses to begin updating for them
* check if the background sync needs to die and if so - die

API 
* Wallet deleted
* Wallet added
* stop syncing 
* dump memory
* address generated
*/
