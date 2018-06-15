import React from 'react';
import Navigator from "./Navigator"
import { Provider } from 'react-redux'
import createStore from "./reduxhelpers/CreateStore"
import { Colors } from './ui/screens/Colors'
import { View, Linking, Platform, StatusBar } from 'react-native';

let store = createStore();

export default class App extends React.Component {

	prefix() {
		return Platform.OS == 'android' ? 'mychat://mychat/' : 'mychat://';
	}

	render() {
		return (
			<Provider store={store}>
                <View style={{flex: 1}}>
                    <StatusBar
                        backgroundColor={Colors.SecondaryBackground}
                        barStyle={'light-content'}
                    />
                    <Navigator uriPrefix={this.prefix()}/>
                </View>
			</Provider>
		)
	}
}
