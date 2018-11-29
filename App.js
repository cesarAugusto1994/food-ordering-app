import React from 'react';
import { ApolloProvider } from 'react-apollo';
import FlashMessage from 'react-native-flash-message';
import { Portal } from 'react-native-paper';

import App from './src';
import client from './src/apollo/index';

export default () => (
  <ApolloProvider client={client}>
    <Portal.Host>
      <App />
    </Portal.Host>
    <FlashMessage position="top" />
  </ApolloProvider>
);
