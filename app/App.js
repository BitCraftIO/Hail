import React from 'react';
import Navigator from "./Navigator"
import { Provider } from 'react-redux'
import createStore from "./reduxhelpers/CreateStore"
import DeepLinking from 'react-native-deep-linking';

let store = createStore();

export default class App extends React.Component {

 	componentDidMount() {
		DeepLinking.addScheme('hail://');
		
		DeepLinking.addRoute('/wallet/:id', (response) => {
			this.setState(response);
		});

		DeepLinking.addRoute('/wallet/setup/coinbase/continue', (state, code) => {
			//TODO: Fix this? Yea
			console.log(state, code, "this is hitting");
			// const {navigate} = this.props.navigation;
        	// navigate("WalletDetailsPage", {"wallet": wallet, refresh: this.refresh});
		});
	}

	componentWillUnmount() {
		Linking.removeEventListener('url', this.handleUrl);
	}

	handleUrl = ({ url }) => {
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
