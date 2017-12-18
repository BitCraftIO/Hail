import React from 'react';
import Navigator from "./Navigator"
import { Provider } from 'react-redux'
import createStore from "./reduxhelpers/CreateStore"

let store = createStore();

export default class App extends React.Component {
  render() {
      return (
          <Provider store={store}>
            <Navigator/>
          </Provider>
      )
  }
}
