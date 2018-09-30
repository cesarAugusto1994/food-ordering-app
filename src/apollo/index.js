import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import {createAppSyncLink} from 'aws-appsync';
import config from '../../config';

import defaults from './defaults';

const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  defaults
});

const auth = {
  type: 'API_KEY',
  apiKey: config.appSyncApiKey
};

export const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    stateLink,
    createAppSyncLink({
      url: config.appSyncApiUrl,
      region: config.appSyncRegion,
      auth
    })
  ]),
})
