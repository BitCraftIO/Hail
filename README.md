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