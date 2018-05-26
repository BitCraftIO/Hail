import React from 'react';
import Navigator from "./Navigator"
import { Provider } from 'react-redux'
import createStore from "./reduxhelpers/CreateStore"
import { Linking, Platform } from 'react-native';

let store = createStore();

export default class App extends React.Component {

	prefix() {
		return Platform.OS == 'android' ? 'mychat://mychat/' : 'mychat://';
	}

	render() {
		return (
			<Provider store={store}>
                    <Navigator uriPrefix={this.prefix()}/>
			</Provider>
		)
	}
}
