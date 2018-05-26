import * as Db from '../localstorage/db/Db';
import Configuration from '../localstorage/db/models/Configuration';
import ProxyPolyfill from 'proxy-polyfill/src/proxy';

const SettingsProxy = new ProxyPolyfill();
let configFile;

function loadConfigFile(testback) {
    let configFileQueryResults = Db.query('Configuration');
    
    if (configFileQueryResults.length == 0) {
        Db.insert('Configuration', {});
    }

    configFile = configFileQueryResults[0];
}
loadConfigFile();

/**
 * Using the Proxy class allows us to have dynamic getters and setters.
 * Having this 'set:' method means any variable declaration on the 'settings'
 * object (eg. settings.logLevel = 1) executes the method instead.
 * This setter stores all changes made to the 'settings' object to realm
 */
export default settings = new SettingsProxy(configFile, {
    set(configFileObject, propertyName, passedInValue) {
        Db.write(() => {
            configFileObject[propertyName] = passedInValue
        })
    }
});
// In order for a property to be saved,
// the Configuration object must have that same property