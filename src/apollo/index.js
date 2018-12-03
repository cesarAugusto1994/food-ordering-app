// Remove the apollo-boost import and change to this:
import ApolloClient from 'apollo-client';
import ApolloClient2 from 'apollo-boost';
// Setup the network "links"
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { split, ApolloLink } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { defaults } from './defaults';

const wsurl = 'wss://eu1.prisma.sh/faustino/foodapp/dev';
const httpurl = 'https://eu1.prisma.sh/faustino/foodapp/dev';

const wsLink = new WebSocketLink({
  uri: wsurl,
  options: {
    reconnect: true,
  },
});
const httpLink = new HttpLink({
  uri: httpurl,
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  defaults,
});

export default new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink, link]),
});
