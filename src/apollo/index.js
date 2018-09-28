// import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
// import { withClientState } from 'apollo-link-state';
import AWSAppSyncClient from 'aws-appsync';
// import AppSyncConfig from './aws-exports';
import config from '../../config';

import defaults from './defaults';

const cache = new InMemoryCache();

const httpLink = new HttpLink({ uri:'http://localhost:3000/graphql' })


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

export const client = new AWSAppSyncClient({
  url: config.appSyncApiUrl,
  region: config.appSyncRegion,
  auth: {
    type: 'API_KEY',
    apiKey: config.appSyncApiKey,
    // jwtToken: async () => token, // Required when you use Cognito UserPools OR OpenID Connect. token object is obtained previously
  },
  cache
})

// appSyncApiUrl
// appSyncApiId
// appSynpiKey
// appSyncRegion


// mutation createUser($createuserinput: CreateUserInput!) {
//   createUser(input: $createuserinput) {
//     userId
//     email
//     firstName
//     lastName
//     image
//   }
// }


// # After running createUser, try running the listUsers query.
// query listUsers {
//   listUsers {
//     items {
//       userId
//       email
//       firstName
//       lastName
//       image
//     }
//   }
// }

// {
//   "createrestaurantinput": {
//     "image": "Hello, world!",
//     "restaurantId": "Hello, world!",
//     "location": "Hello, world!",
//     "waitTime": "Hello, world!",
//     "description": "Hello, world!",
//     "name": "Hello, world!",
//     "speciality": "Hello, world!",
//     "ownerId": "Hello, world!"
//   }
// }

// mutation createRestaurants($createrestaurantinput: CreateRestaurantInput) {
//   createRestaurant(input: $CreateRestaurantInput) {
//     image
//     restaurantId
//     location
//     waitTime
//     description
//     ownerId
//     speciality
//     name
//   }
// }
