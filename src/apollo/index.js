import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';

import defaults from './defaults';

const cache = new InMemoryCache();

const httpLink = new HttpLink({ uri:'http://localhost:3000/graphql' })


// https://api-euwest.graphcms.com/v1/cjj608mvq01ea01ebg82n4n7h/master

const stateLink = withClientState({
  cache,
  defaults
});

export const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    stateLink,
    httpLink
  ]),
})
