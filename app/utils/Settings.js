import * as Db from '../localstorage/db/Db';

const MODEL = 'Configuration';

export var configFile = () => {
    return Db.query(MODEL, 'id = "01001000"');
};

function setupConfig() {
    if (configFile().length == 0) {
        Db.insert(MODEL, { id: '01001000' });
    }
}

export function setLogLevel(loglevel) {
    Db.update(configFile, { loglevel });
}

setupConfig();
