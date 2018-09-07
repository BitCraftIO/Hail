![Alt Hail](assets/Hail.png)

# Hail

Hail is a versatile, self contained crypto currency wallet for Android and iOS built with React-Native. 

# Main Features
- BIP32 HD Wallet derivation
- BIP44 derivation path compliance across all coins
- All keys stored locally, not on any server
- All keys encrypted locally
- Keys are never transmitted, only serialized transactions
- Coinbase wallet support
- Sync Managing
- Ethereum support
- Ethereum syncing
- Ethereum testnet support 
- Bitcoin support
- Bitcoin Simplified Payment Verification (SPV) support [WIP]
- Modular structure for simple plug and play for future coins


# Disclaimer

This project is INCOMPLETE and should be hardcoded to use only testnet currencies.

# Current State

As I am leaving this project right now, it is currently incomplete. Address generation and key management for ethereum and bitcoin are complete, functional, and tested; however transaction syncing is finished only for ethereum. The framework for background syncing is there in `Hail/app/syncmanager`. Ethereum currently relies on a blockexplorer such as [etherscan.io](https://etherscan.io/apis). Bitcoin SPV is incomplete, however the stage is set for someone to implement it using the node.js library [bcoin](http://bcoin.io/). Getting the node.js module to work in React-Native is difficult, so contact me if you're having issues.

If you're interested in this project, it is large and full of features that had to be deprecated in favor of dwindling resources. If you have any issues create an issue.

# Structure

Hail is comprised of a few key components
- **crypto** - contains factory functions for all functionality related to address, transaction generation. Also contains everything required to communicate with the crypto network on a shallow level (web3.js for transaction posting for example)
- **localstorage** - Hail mostly ran on [Realm](https://realm.io/docs/javascript/latest/) and treated Realm as a single source of truth to manage state across the application. While Realm was responsible for vital encrypted key storage, it was also used to manage the state of sync when syncing with the blockchain, as that task would have to persist beyond the app lifecycle. With iOS's strict background task rules, sometimes many lifecycles before the app could fully sync. Realm was also responsible for managing system configuration settings which was handled by `Hail/app/utils/Settings.js`
- **syncmanager** - Responsible for managing the state of multiple heavy syncing tasks
- **ui** - All the ui things. Look at the section below.

## Contributing

Development requires Node version 8 or higher as well as the React Native CLI (`npm install -g react-native-cli`)

To compile and test, you must have a *recent* edition of XCode or the Android SDK installed.

To install the dependencies required after cloning, do `npm install`.

Now you can install the client app on your connected emulator or device by running either `react-native run-android` or `react-native run-ios`.

The React Native debug client loads code from a "bundler" running on your local computer. The `react-native run-*` commands start this automatically for you. If you find yourself needing to run it manually, the command is `npm start`.

## Quick Fixes

Here are some fixes to current problems in the build process. *Warning*: make sure not to commit tainted `android/` or `ios/` directories to Git.

`npm run start --clear-cache`    Start the bundler with a clean slate

`npm run eject`                  Delete ios/android folders and regenerate native files. Be sure to commit changes before and pull afterwards to get native file changes.

`npm run fresh-start`            Delete all generated folders and recreates them. Follow the same advice as above.

# Functionality Documentation

## Logger

The Logger is meant to give users an oppurtunity to take a look inside of Hail, so that processes can be audited and frustration can be taken out on errors instead of developers.

Debug logs should be handled by `console.log()`, which is overwritten in `global.js` to output nothing when in a production environment.

The Logger class follows a singleton model, so you should be able to execute Logger methods immediately upon import.

There are currently 3 log levels. The logger will only log logs at a lower level than the one set in the settings menu. From more important to least the order goes:

### 0 Error

`Logger.error(message)`

Log for errors that the user cares about

Eg. "Transaction Failed"

### 1 Notify

`Logger.notify(message)`

Log for updates the user would want to know about

Eg. "Transaction Confirmed" or "Transaction Received"

### 2 Info

`Logger.info(message)`

Log for important status updates that the user might not care about

Eg. "Sync Manager Started" or "BTC Sync Complete"
