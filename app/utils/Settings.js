import * as Db from '../localstorage/db/Db';
//import CoinLineChart from '../ui/CoinLineChart';
//var Db = require('../localstorage/db/Db');

const MODEL = 'Configuration';
console.log(Db);

export var configFile = () => {
    return Db.query(MODEL, 'id = "01001000"');
};

function setupConfig() {
    if (configFile() == null) {
        Db.insert(MODEL, { id: '01001000' });
    }
}

export function setLogLevel(loglevel) {
    Db.update(configFile, { loglevel });
}

setupConfig();
