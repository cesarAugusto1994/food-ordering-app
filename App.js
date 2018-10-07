import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {ApolloProvider} from 'react-apollo';
import {Provider} from "redux-zero/react";
import { Rehydrated } from 'aws-appsync-react';
import FlashMessage from "react-native-flash-message";

import App from './src/';
import store from './src/store';
import {client} from './src/apollo/index';

console.ignoredYellowBox = ['Remote', 'Warning']
export default () => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
      <FlashMessage position="top" />
    </ApolloProvider>
  </Provider>
);
