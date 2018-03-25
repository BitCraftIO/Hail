import Db from '../localstorage/db/Db';
import * as settings from './Settings';

export function logger(logLevel, message) {
    const date = new Date(Date.now());
    if (logLevel <= settings.configFile.logLevel) {
        const id = highestId + 1;
        Db.insert('Log', { id, date, logLevel, message });
        console.log(`${date} : ${logLevel} :: ${message}`);
    } else if (logLevel == 4) {
        console.log(`${date} : ${logLevel} :: ${message}`);
    }
}

export function readFromLog() {}

var highestId = () => {
    return Db.query('Log').sorted('id', true)[0].id;
};
