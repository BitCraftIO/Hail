Hail
========

Hail is a cross-platform, multi-coin, multi-exchange cryptocurrency portfolio manager. It is built using React Native.

Slack: https://hail-app.slack.com/

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

The Logger class should be instantiated with a string containing the name of the calling file passed into the constructor: `loggerName = new Logger(fileNameString)`. This is used to provide easier log tracing during development.

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
