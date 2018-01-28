// Inject node globals into React Native global scope.
// Required for crypto functionality for bitcoinjs-lib, web3, etc.

global.Buffer = require('buffer').Buffer;
global.process = require('process');

// TODO: use secure random number generator for this
var getRandomValues = function (byteArray) {
    for (let i = 0; i < byteArray.length; i++) {
        byteArray[i] = Math.floor(256 * Math.random());
    }
}
// "But Zach, aren't you just doing the same thing twice?"
// Yes. Initializing the crypto-browserify module eventually requires
// crypto.getRandomValues to exist, so we must add it here once.
// However, crypto-browserify does not support getRandomValues, so we
// must re-add it after loading the module.
global.crypto = { getRandomValues }
global.crypto = require('crypto');
global.crypto.getRandomValues = getRandomValues;

global.process.env.NODE_ENV = __DEV__ ? 'development' : 'production';

// Needed so that 'stream-http' chooses the right default protocol.
global.location = {
    protocol: 'file:',
};