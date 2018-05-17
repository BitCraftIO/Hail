import React from 'react';
import Navigator from './Navigator';
import { Provider } from 'react-redux';
import createStore from './reduxhelpers/CreateStore';
import { Linking, Platform } from 'react-native';
import SyncManager from './syncmanager';
const sm = new SyncManager();

let store = createStore();

export default class App extends React.Component {
    prefix() {
        return Platform.OS == 'android' ? 'hail://hail/' : 'hail://';
    }

    render() {
        return (
            <Provider store={store}>
                <Navigator uriPrefix={this.prefix()} />
            </Provider>
        );
    }
}
