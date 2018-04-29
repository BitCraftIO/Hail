import * as Db from '../localstorage/db/Db';
import Log from '../localstorage/db/models/Log';
import * as settings from './Settings';
import moment from 'moment';

export class Logger {
    levelMap = {
        0: 'Error',
        1: 'Notify',
        2: 'Info'
    }

    /**
     * Log for errors that the user cares about
     * Eg. "Transaction Failed"
     * @param {String} message 
     */
    error(message) {
        this._storeLog(message, 0);
    }

    /**
     * Log for updates the user would want to know about
     * Eg. "Transaction Confirmed" or "Transaction Received"
     * @param {String} message 
     */
    notify(message) {
        this._storeLog(message, 1);
    }
    
    /**
     * Log for important status updates that the user might not care about
     * Eg. "Sync Manager Started" or "BTC Sync Complete"
     * @param {String} message 
     */
    info(message) {
        this._storeLog(message, 2);
    }

    /**
     * Stores log messages to be read chronologically later
     * @param {String} message 
     * @param {number} logLevel 
     */
    _storeLog(message, logLevel) {
        let timestamp = moment().format(),
            date = timestamp.toDate();

        if (logLevel <= settings.configFile.logLevel) {
            let logObject = {
                date,
                logLevel,
                message
            }
            
            Db.insert(Log, logObject);
        }
        console.log(`${timestamp} : ${this.levelMap[logLevel]} :: ${message}`)
    }
}