import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {ApolloProvider} from 'react-apollo';
import {Provider} from "redux-zero/react";

import App from './src/';
import store from './src/store';
import {client} from './src/apollo/index';

export default () => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>
);
