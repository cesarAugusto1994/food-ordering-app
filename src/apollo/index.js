// import ApolloClient from 'apollo-client';
import ApolloClient from "apollo-boost";
import config from '../../config';

import {defaults, typeDefs} from './defaults';

export const client = new ApolloClient({
  uri: 'https://eu1.prisma.sh/faustino/foodapp/dev',
  clientState: {
    defaults: {
      auth: {
        isAuthed: false,
        __typename: 'Auth'
      },
      user: {
        userId: '',
        email: '',
        firstName: '',
        lastName: '',
        image: '',
        __typename: 'User'
      },
      whoIs: {
        isUser: false,
        isOwner: false,
        __typename: 'WhoIs'
      },
      shopCard: {
        items: [],
        __typename: 'Card'
      },
      orders: {
        items: [],
        __typename: 'Orders'
      },
      restaurants: {
        items: [],
        __typename: 'Restaurants'
      },
      categories: {
        items: [],
        __typename: 'Categories'
      },
      restaurantId: {
        id: '',
        __typename: 'RestaurantID'
      },
    },
    resolvers: {
      Mutation: {
        signOnUser: (_, {user, isAuthed, whoIs}, {cache}) => {
          cache.writeData({data: {auth: {isAuthed}, user: { ...user}, whoIs: { ...whoIs}}});
          return null;
        }
      }
    }
  }
})
