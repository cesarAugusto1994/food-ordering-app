import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ApolloProvider } from 'react-apollo';
import { Provider } from "redux-zero/react";
import store from './src/store';
import _App from './src/';
import {client} from './src/apollo/index';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
          <ApolloProvider client={client}>
            <_App />
        </ApolloProvider>
      </Provider>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
