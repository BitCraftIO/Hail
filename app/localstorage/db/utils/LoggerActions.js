// @flow
import * as Db from 'hail/app/localstorage/db/Db';
import Logger from 'hail/app/utils/Logger';

const LOG_MODEL = 'Log'
const LOG_LIST = getLogs();

export function getLogs() {
    let results = Db.query(LOG_MODEL);
    return results;
}

export function storeLog(logObject) {
    Db.insert(LOG_MODEL, logObject);
}