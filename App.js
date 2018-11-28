import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {ApolloProvider} from 'react-apollo';
import {Provider} from "redux-zero/react";
import FlashMessage from "react-native-flash-message";
import { Modal, Portal } from 'react-native-paper';


import App from './src/';
import store from './src/store';
import {client} from './src/apollo/index';

export default () => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <Portal.Host>
        <App />
      </Portal.Host>
      <FlashMessage position="top" />
    </ApolloProvider>
  </Provider>
);
