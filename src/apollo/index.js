// import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
// import { withClientState } from 'apollo-link-state';
import AWSAppSyncClient from 'aws-appsync';
// import AppSyncConfig from './aws-exports';
import config from '../../config';

// import defaults from './defaults';

// const cache = new InMemoryCache();

// const httpLink = new HttpLink({ uri:'http://localhost:3000/graphql' })


// https://api-euwest.graphcms.com/v1/cjj608mvq01ea01ebg82n4n7h/master

// const stateLink = withClientState({
//   cache,
//   defaults
// });

// export const client = new ApolloClient({
//   cache,
//   link: ApolloLink.from([
//     stateLink,
//     httpLink
//   ]),
// })

const options = {
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    }
  }
};


export const client = new AWSAppSyncClient({
  url: config.appSyncApiUrl,
  region: config.appSyncRegion,
  auth: {
    type: 'API_KEY',
    apiKey: config.appSyncApiKey,
    // jwtToken: async () => token, // Required when you use Cognito UserPools OR OpenID Connect. token object is obtained previously
  },
}, options);
