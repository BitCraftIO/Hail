// Inject node globals into React Native global scope.
// Required for crypto functionality for bitcoinjs-lib, web3, etc.

global.Buffer = require('buffer').Buffer;
global.process = require('process');
global.crypto = require('crypto');

global.process.env.NODE_ENV = __DEV__ ? 'development' : 'production';

// Needed so that 'stream-http' chooses the right default protocol.
global.location = {
    protocol: 'file:',
};