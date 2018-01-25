import React from 'react';
import Navigator from "./Navigator"
import { Provider } from 'react-redux'
import createStore from "./reduxhelpers/CreateStore"
import DeepLinking from 'react-native-deep-linking';
import { Linking } from 'react-native';

let store = createStore();

export default class App extends React.Component {

 	componentDidMount() {
		DeepLinking.addScheme('hail://');
		Linking.addEventListener('url', this.handleUrl);

		DeepLinking.addRoute('/wallet/:id', ({scheme, path, id}) => {
			console.log(scheme);
			console.log(path);
			console.log(id);
		});

		DeepLinking.addRoute('/wallet/setup/coinbase/continue#', ({scheme, path}) => {
			//TODO: Fix this? Yea
			console.log(scheme, path, "this is hitting");
			// alert("this is hitting");
			// const {navigate} = this.props.navigation;
        	// navigate("WalletsList");
		});

		Linking.getInitialURL().then((url) => {
			if (url) {
			  Linking.openURL(url);
			}
		  }).catch(err => console.error('An error occurred', err));
	}

	componentWillUnmount() {
		//TODO: Find out why this isn't solving the memory leak
		Linking.removeEventListener('url', this.handleUrl);
	}

	handleUrl = ({ url }) => {

		console.log(url);
		Linking.canOpenURL(url).then((supported) => {
			if (supported) {
				DeepLinking.evaluateUrl(url);
			}
		});
	  }

	render() {
		return (
			<Provider store={store}>
				<Navigator/>
			</Provider>
		)
	}
}
