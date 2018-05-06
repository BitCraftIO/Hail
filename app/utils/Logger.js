import * as Db from '../localstorage/db/Db';
import Log from '../localstorage/db/models/Log';
import settings from './Settings';
import moment from 'moment';

export default class Logger {
    levelMap = {
        0: 'Error',
        1: 'Notify',
        2: 'Info'
    }

    // Name of the calling file should default to warning incase no file name is passed in
    callingFile = 'Logger warning -- Please pass the name of the calling file into Logger constructor';

    /**
     * Constructor takes in a file name to display along-side messages for easier tracing
     * @param {String} filename The name of the file instantiating the Logger class
     */
    constructor(filename) {
        if (filename) {
            this.callingFile = filename;
        }
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
        let momentInstance = moment(),
            timestamp = momentInstance.format(),
            date = momentInstance.toDate();

        if (logLevel <= settings.logLevel) {
            let logObject = {
                date,
                logLevel,
                message
            }
            
            Db.insert(Log, logObject);
        }
        console.log(`${timestamp} : ${this.levelMap[logLevel]} : ${this.callingFile} :: ${message}`)
    }
}