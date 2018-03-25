import Db from '../localstorage/db/Db';

const MODEL = 'Configuration';
export var configFile = () => {
    return Db.query(MODEL, 'id = 01001000');
};

function setupConfig() {
    const conf = configFile;
    if (conf == null) {
        Db.insert(MODEL, { id: '01001000' });
    }
}

export function setLogLevel(loglevel) {
    Db.update(configFile, { loglevel });
}

setupConfig();
