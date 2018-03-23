import Db from './localstorage/db/Db';

export function logger(logLevel, message) {
    const date = new Date(Date.now());
    const id = 1;
    //Db.insert('Log', { id, logLevel, message, date });
    console.log(message);
}

export function readFromLog() {}
