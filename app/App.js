import React from 'react';
import Navigator from "./Navigator"
import { Provider } from 'react-redux'
import createStore from "./reduxhelpers/CreateStore"
//import DeepLinking from 'react-native-deep-linking';
import { Linking } from 'react-native';

let store = createStore();

export default class App extends React.Component {


	prefix = () => {Platform.OS == 'android' ? 'mychat://mychat/' : 'mychat://'}


	componentWillUnmount() {
		//TODO: Find out why this isn't solving the memory leak
		Linking.removeEventListener('url', this.handleUrl);
	}

	handleUrl = ({ url }) => {

		console.log("handle url " + url);
		Linking.canOpenURL(url).then((supported) => {
			if (supported) {
				DeepLinking.evaluateUrl(url);
			}
		});
	  }

	render() {
		return (
			<Provider store={store}>
				<Navigator uriPrefix={this.prefix}/>
			</Provider>
		)
	}
}
